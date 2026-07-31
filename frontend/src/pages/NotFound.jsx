import { Helmet } from 'react-helmet-async'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Janta Tea</title>
      </Helmet>
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
        <span className="font-heading text-7xl font-bold text-tea-gold">404</span>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-tea-dark">This page steeped away</h1>
        <p className="mt-2 text-tea-ink/65">The page you're looking for doesn't exist.</p>
        <div className="mt-8">
          <Button to="/" variant="primary">Back to Home</Button>
        </div>
      </section>
    </>
  )
}
