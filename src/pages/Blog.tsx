import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { ARTICLES } from '../data/content';

export function BlogList() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Blog</h1>
      <p className="mt-1 text-sm text-neutral-500">Buying guides, installment tips and laptop care.</p>
      <div className="mt-6 space-y-4">
        {ARTICLES.map((a) => (
          <Link key={a.slug} to={`/blog/${a.slug}`} className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">{a.category}</p>
            <h2 className="mt-1 font-display text-lg font-bold">{a.title}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
              <CalendarDays className="h-3.5 w-3.5" /> {new Date(a.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="mt-2 text-sm text-neutral-600">{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="font-display text-xl font-bold">Article not found</p>
        <Link to="/blog" className="mt-3 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-ink">
          Back to blog
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-2xl px-4 py-6">
      <Link to="/blog" className="flex items-center gap-1 text-sm font-semibold text-neutral-500 hover:text-brand-dark">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-brand-dark">{article.category}</p>
      <h1 className="mt-1 font-display text-3xl font-bold leading-tight">{article.title}</h1>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
        <CalendarDays className="h-3.5 w-3.5" /> {new Date(article.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-800">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
