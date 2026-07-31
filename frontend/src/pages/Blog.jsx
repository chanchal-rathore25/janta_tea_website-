import { Helmet } from 'react-helmet-async'

const POSTS = [
  { id: 1, title: '5 Health Benefits of Green Tea', category: 'Tea Benefits', image: '/images/blog/green-tea-benefits.jpg', excerpt: 'From metabolism to mental clarity — what daily green tea actually does for your body.' },
  { id: 2, title: 'How to Brew The Perfect Masala Chai', category: 'Recipes', image: '/images/blog/masala-chai-recipe.jpg', excerpt: 'The exact ratio of spices, milk and leaf our founder swears by.' },
  { id: 3, title: 'Organic vs Regular Tea: What\u2019s The Real Difference', category: 'Articles', image: '/images/blog/organic-vs-regular.jpg', excerpt: 'A honest breakdown of sourcing, certification and taste.' },
]

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | Janta Tea</title>
        <meta name="description" content="Tea benefits, recipes and articles from the Janta Tea team." />
      </Helmet>

      <section className="bg-tea-dark py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-tea-cream">From Our Journal</h1>
        <p className="mt-3 text-tea-cream/70">Tea benefits, recipes &amp; articles</p>
      </section>

      <section className="section-container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-shadow duration-300">
            <img src={post.image} alt={post.title} loading="lazy" className="w-full aspect-video object-cover" />
            <div className="p-6">
              <span className="text-tea-gold text-xs font-semibold uppercase tracking-wide">{post.category}</span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-tea-dark">{post.title}</h3>
              <p className="mt-2 text-tea-ink/65 text-sm line-clamp-2">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
