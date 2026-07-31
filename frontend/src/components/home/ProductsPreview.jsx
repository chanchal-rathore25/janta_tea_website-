import SectionTitle from '../SectionTitle'
import ProductCard from '../ProductCard'
import Button from '../Button'
import { PRODUCTS } from '../../constants/siteData'

export default function ProductsPreview() {
  return (
    <section className="section-container py-20 sm:py-28">
      <SectionTitle
        eyebrow="Our Range"
        title="Our Products"
        description="Six blends, one promise — natural tea crafted for every taste and every moment."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button to="/products" variant="primary">View All Products</Button>
      </div>
    </section>
  )
}
