import { WorkerMailer } from "worker-mailer";

// Cloudflare Pages Function for POST /api/reserve.
// Secrets come from the Pages project environment variables:
//   EMAIL_USER — Gmail address that sends the mail (also receives the store copy)
//   EMAIL_PASS — 16-character Gmail App Password
// Optional:
//   NOTIFY_EMAIL — override where store notifications go (defaults to EMAIL_USER)

interface Env {
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
  NOTIFY_EMAIL?: string;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

interface ReservationItem {
  name: string;
  qty: number;
  price: number;
}

interface ReservationRequest {
  ref: string;
  name: string;
  phone: string;
  email: string;
  branch: string;
  payment: string;
  items: ReservationItem[];
  total: number;
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ITEMS = 25;
const MAX_FIELD = 200;

// Per-IP sliding-window rate limit. Isolate-local, so best-effort.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
};

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const peso = (n: number): string => `₱${n.toLocaleString("en-PH")}`;

export const onRequestPost = async (context: PagesFunctionContext): Promise<Response> => {
  const ip = context.request.headers.get("cf-connecting-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return json(
      { success: false, message: "Too many reservation attempts. Please wait a few minutes and try again." },
      429,
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await context.request.json()) as Record<string, unknown>;
  } catch {
    return json({ success: false, message: "Invalid request body." }, 400);
  }

  const rawItems = Array.isArray(body.items) ? (body.items as Record<string, unknown>[]) : [];
  const items: ReservationItem[] = rawItems.slice(0, MAX_ITEMS).map((it) => ({
    name: String(it.name ?? "").slice(0, MAX_FIELD),
    qty: Math.min(Math.max(1, Number(it.qty) || 1), 99),
    price: Math.max(0, Number(it.price) || 0),
  }));

  const fields: ReservationRequest = {
    ref: String(body.ref ?? "").trim().slice(0, 40),
    name: String(body.name ?? "").trim().slice(0, MAX_FIELD),
    phone: String(body.phone ?? "").trim().slice(0, 40),
    email: String(body.email ?? "").trim().slice(0, 254),
    branch: String(body.branch ?? "").trim().slice(0, MAX_FIELD),
    payment: String(body.payment ?? "").trim().slice(0, 60),
    items,
    total: Math.max(0, Number(body.total) || 0),
  };

  if (!fields.name || !fields.phone || !fields.branch || items.length === 0) {
    return json({ success: false, message: "Name, mobile number, pickup branch and at least one item are required." }, 400);
  }
  if (fields.email && !EMAIL_RE.test(fields.email)) {
    return json({ success: false, message: "The email address entered is not valid." }, 400);
  }

  const emailUser = context.env.EMAIL_USER;
  const emailPass = context.env.EMAIL_PASS;
  const notifyTo = context.env.NOTIFY_EMAIL || emailUser;

  const isPlaceholder =
    !emailUser || !emailPass || emailUser.includes("your-gmail") || emailPass.includes("your-");

  if (isPlaceholder) {
    console.warn("EMAIL_USER or EMAIL_PASS environment variables are missing or using placeholders.");
    // Reservation still succeeds client-side — the customer gets a reference
    // number; the store just does not receive the email copy.
    return json(
      {
        success: false,
        emailNotConfigured: true,
        hasEmailUser: !!emailUser,
        hasEmailPass: !!emailPass,
        envKeys: Object.keys(context.env).sort(),
        message: "Reservation email is not configured yet (EMAIL_USER / EMAIL_PASS missing).",
      },
      200,
    );
  }

  const safeRef = escapeHtml(fields.ref);
  const safeName = escapeHtml(fields.name);
  const safePhone = escapeHtml(fields.phone);
  const safeBranch = escapeHtml(fields.branch);
  const safePayment = escapeHtml(fields.payment);
  const safeTotal = escapeHtml(peso(fields.total));

  const itemsRows = items
    .map(
      (it) =>
        `<tr>
          <td style="padding:8px 0;font-size:13px;color:#374151;">${escapeHtml(it.name)} × ${it.qty}</td>
          <td style="padding:8px 0;font-size:13px;color:#374151;text-align:right;">${escapeHtml(peso(it.price * it.qty))}</td>
        </tr>`,
    )
    .join("");

  const itemsText = items.map((it) => `- ${it.name} x${it.qty} = ${peso(it.price * it.qty)}`).join("\n");

  const storeHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
      <div style="background:#1f1f1f;padding:20px 24px;border-bottom:4px solid #ee4d2d;">
        <h1 style="color:#fff;font-size:18px;margin:0;">New Reservation ${safeRef}</h1>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="padding:4px 0;color:#6b7280;width:120px;">Customer</td><td style="padding:4px 0;font-weight:bold;">${safeName}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280;">Mobile</td><td style="padding:4px 0;font-weight:bold;">${safePhone}</td></tr>
          ${fields.email ? `<tr><td style="padding:4px 0;color:#6b7280;">Email</td><td style="padding:4px 0;">${escapeHtml(fields.email)}</td></tr>` : ""}
          <tr><td style="padding:4px 0;color:#6b7280;">Pickup branch</td><td style="padding:4px 0;font-weight:bold;">${safeBranch}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280;">Payment</td><td style="padding:4px 0;">${safePayment} (pay at store)</td></tr>
        </table>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e7eb;margin-top:12px;">
          ${itemsRows}
          <tr>
            <td style="padding:10px 0;font-size:14px;font-weight:bold;border-top:1px solid #e5e7eb;">Total</td>
            <td style="padding:10px 0;font-size:14px;font-weight:bold;text-align:right;border-top:1px solid #e5e7eb;">${safeTotal}</td>
          </tr>
        </table>
      </div>
      <p style="font-size:11px;color:#9ca3af;text-align:center;">Sent from laptopwarehouseph.pages.dev reservation form</p>
    </div>`;

  const storeText = `New reservation ${fields.ref}

Customer: ${fields.name}
Mobile: ${fields.phone}
${fields.email ? `Email: ${fields.email}\n` : ""}Pickup branch: ${fields.branch}
Payment: ${fields.payment} (pay at store)

Items:
${itemsText}

Total: ${peso(fields.total)}`;

  const customerHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
      <div style="background:#1f1f1f;padding:20px 24px;border-bottom:4px solid #ee4d2d;text-align:center;">
        <h1 style="color:#fff;font-size:18px;margin:0;">Laptop Warehouse</h1>
        <p style="color:#ee4d2d;font-size:11px;margin:6px 0 0;letter-spacing:2px;font-weight:bold;">RESERVATION CONFIRMED</p>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;">
        <p style="font-size:14px;">Hi <strong>${safeName}</strong>,</p>
        <p style="font-size:13px;color:#4b5563;">Your reservation is in. Show this reference at the store to pay and claim your unit — we hold items for 48 hours.</p>
        <div style="background:#fafafa;border-left:4px solid #ee4d2d;padding:16px 20px;margin:16px 0;">
          <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Reference</p>
          <p style="margin:0;font-size:20px;font-weight:bold;font-family:monospace;">${safeRef}</p>
          <p style="margin:10px 0 0;font-size:13px;"><strong>Pickup:</strong> ${safeBranch}</p>
          <p style="margin:4px 0 0;font-size:13px;"><strong>Total:</strong> ${safeTotal} — ${safePayment}, pay at the counter</p>
        </div>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e7eb;">
          ${itemsRows}
        </table>
        <p style="font-size:12px;color:#6b7280;margin-top:20px;">Questions? Message us on Facebook or TikTok @laptopwarehousemain. Want delivery instead? Order via our Shopee, TikTok Shop, or Lazada stores.</p>
      </div>
      <p style="font-size:11px;color:#9ca3af;text-align:center;">This is an automated email from Laptop Warehouse.</p>
    </div>`;

  const customerText = `Hi ${fields.name},

Your reservation is in — reference ${fields.ref}.

Pickup: ${fields.branch}
Total: ${peso(fields.total)} — ${fields.payment}, pay at the counter
Items:
${itemsText}

We hold items for 48 hours. Questions? Message us on Facebook or TikTok @laptopwarehousemain.`;

  try {
    const mailer = {
      host: "smtp.gmail.com",
      port: 587,
      credentials: { username: emailUser, password: emailPass },
      authType: ["login", "plain"] as ("login" | "plain")[],
      socketTimeoutMs: 15000,
    };

    // Store notification first — this is the one the business needs.
    await WorkerMailer.send(mailer, {
      from: { name: "Laptop Warehouse Reservations", email: emailUser },
      to: { name: "Laptop Warehouse", email: notifyTo! },
      subject: `New reservation ${fields.ref} — ${fields.name} (${fields.branch})`,
      text: storeText,
      html: storeHtml,
    });

    let customerEmailed = false;
    if (fields.email) {
      try {
        await WorkerMailer.send(mailer, {
          from: { name: "Laptop Warehouse", email: emailUser },
          to: { name: fields.name, email: fields.email },
          subject: `Reservation confirmed — ${fields.ref}`,
          text: customerText,
          html: customerHtml,
        });
        customerEmailed = true;
      } catch (err) {
        console.error("Store notified but customer confirmation failed:", err);
      }
    }

    return json({ success: true, customerEmailed, message: "Reservation recorded." }, 200);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Failed to send email via SMTP:", errorMsg);

    if (errorMsg.includes("535") || errorMsg.toLowerCase().includes("invalid login")) {
      return json(
        {
          success: false,
          isAuthError: true,
          message:
            "Gmail SMTP authentication failed (535). EMAIL_USER / EMAIL_PASS is wrong — Google requires a 16-character App Password, not the account password.",
        },
        200,
      );
    }

    return json({ success: false, message: "Reservation email failed to send." }, 200);
  }
};

export const onRequestGet = (): Response =>
  json({ success: false, message: "Method not allowed." }, 405);
