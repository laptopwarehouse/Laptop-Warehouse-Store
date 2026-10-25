export const STORE = {
  name: 'Laptop Warehouse',
  tagline: 'Great laptops. Warehouse prices.',
  phone: '0927 700 3432',
  email: 'hello@laptopwarehouse.ph',
  facebook: 'https://www.facebook.com/laptopwarehouseph',
  tiktok: 'https://www.tiktok.com/@laptopwarehousemain',
  instagram: 'https://www.instagram.com/',
  shopee: 'https://shopee.ph/laptopwarehousesan',
  lazada: 'https://www.lazada.com.ph/tag/laptop-warehouse-official/',
  shopeeSearch: (q: string) => `https://shopee.ph/search?keyword=${encodeURIComponent(q)}`,
};

export const PAYMENT_METHODS = ['Cash', 'GCash', 'Maya', 'Visa / Mastercard', 'Bank transfer', 'BillEase', 'Home Credit'];

export interface InstallmentPlan {
  months: number;
  label: string;
  rate: number;
}

export const INSTALLMENT_PLANS: InstallmentPlan[] = [
  { months: 3, label: '3 months', rate: 0 },
  { months: 6, label: '6 months', rate: 0 },
  { months: 12, label: '12 months', rate: 0.03 },
  { months: 24, label: '24 months', rate: 0.06 },
];

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'how-to-pick-a-laptop-for-college',
    title: 'How to pick a laptop for college in 2026',
    date: '2026-09-28',
    category: 'Buying Guide',
    excerpt: 'Course, budget, and battery life matter more than the spec sheet. Here is a quick checklist before you buy.',
    body: [
      'Start with your course. Engineering, architecture and multimedia students need a dedicated GPU (RTX 3050 or better) for CAD and rendering. Business, education and nursing students are fine with an Intel Core i5 or Ryzen 5 and integrated graphics.',
      'Go for at least 16GB of RAM and a 512GB SSD. 8GB fills up quickly with a browser, Zoom and Office open at the same time.',
      'Check battery life and weight if you commute. A 1.5 kg laptop with 8+ hours of battery is much easier to carry around campus than a 2.3 kg gaming machine.',
      'Ask about student promos and 0% installment. Most of our branches can process BillEase or Home Credit with just a valid ID.',
    ],
  },
  {
    slug: 'installment-without-credit-card',
    title: 'Buying a laptop on installment without a credit card',
    date: '2026-09-14',
    category: 'Installment',
    excerpt: 'No credit card? No problem. Here is how BillEase and Home Credit work at our branches.',
    body: [
      'Bring one valid government ID and your active mobile number. Approval for BillEase and Home Credit usually takes 15 to 30 minutes in-store.',
      'Down payments start at 0% for qualified customers. Terms run from 3 to 24 months depending on the provider.',
      'You can also pay in installments with a credit card at 0% for 3 to 6 months on participating banks.',
    ],
  },
  {
    slug: 'ram-and-ssd-upgrades',
    title: 'When is a RAM or SSD upgrade worth it?',
    date: '2026-08-30',
    category: 'Useful Tips',
    excerpt: 'A cheap upgrade can make an older laptop feel new. Here is when it helps and when to replace instead.',
    body: [
      'If your laptop still uses a hard drive, moving to an SSD is the single biggest speed boost you can buy. Boot times drop from minutes to seconds.',
      'If Task Manager shows memory usage above 85% during normal use, adding RAM will help. Check first if your RAM is soldered; many thin laptops cannot be upgraded.',
      'Upgrades are done in-store while you wait, and we clone your old drive so you keep all your files.',
    ],
  },
  {
    slug: 'gaming-laptop-care',
    title: '5 ways to keep your gaming laptop cool',
    date: '2026-08-12',
    category: 'Useful Tips',
    excerpt: 'Philippine heat is tough on gaming laptops. Simple habits that keep temps and fan noise down.',
    body: [
      'Use a cooling pad or raise the back of the laptop for better airflow.',
      'Never game on a bed or pillow; soft surfaces block the intake vents.',
      'Clean the fans every 6 to 12 months. Our branches offer free cleaning for laptops bought from us.',
      'Use the manufacturer performance app to switch to a balanced profile when you are not gaming.',
      'Keep drivers and BIOS up to date for better power management.',
    ],
  },
];
