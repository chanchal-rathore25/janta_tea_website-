import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi'
import Button from '../components/Button'
import { CONTACT_INFO } from '../constants/siteData'
import { submitContactForm } from '../services/api'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Janta Tea</title>
        <meta name="description" content="Get in touch with Janta Tea for bulk orders, inquiries or feedback. Call, email or visit us." />
      </Helmet>

      <section className="bg-tea-dark py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-tea-cream">Get In Touch</h1>
        <p className="mt-3 text-tea-cream/70">We'd love to hear from you</p>
      </section>

      <section className="section-container py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-tea-dark mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Your Name"
                className="w-full px-5 py-3 rounded-lg bg-white border border-tea-dark/10 text-sm focus:outline-none focus-visible:outline-2"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                placeholder="Your Email"
                className="w-full px-5 py-3 rounded-lg bg-white border border-tea-dark/10 text-sm focus:outline-none focus-visible:outline-2"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                placeholder="Phone Number"
                className="w-full px-5 py-3 rounded-lg bg-white border border-tea-dark/10 text-sm focus:outline-none focus-visible:outline-2"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <textarea
                {...register('message', { required: 'Please write a message' })}
                placeholder="Your Message"
                rows={5}
                className="w-full px-5 py-3 rounded-lg bg-white border border-tea-dark/10 text-sm focus:outline-none focus-visible:outline-2 resize-none"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <Button as="button" type="submit" variant="primary" className="w-full sm:w-auto">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            {status === 'success' && <p className="text-tea-leaf text-sm">Thanks! We'll get back to you shortly.</p>}
            {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try WhatsApp or call us directly.</p>}
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <iframe
              title="Janta Tea location"
              src="https://www.google.com/maps?q=Indore%2C+Madhya+Pradesh&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div className="bg-white rounded-2xl p-7 space-y-4 shadow-sm">
            <InfoRow icon={<HiOutlineLocationMarker />} label={CONTACT_INFO.address} />
            <InfoRow icon={<HiOutlinePhone />} label={CONTACT_INFO.phone} href={`tel:${CONTACT_INFO.phone}`} />
            <InfoRow icon={<HiOutlineMail />} label={CONTACT_INFO.email} href={`mailto:${CONTACT_INFO.email}`} />
            <InfoRow icon={<HiOutlineClock />} label={CONTACT_INFO.hours} />
          </div>

          <Button
            as="a"
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            variant="primary"
            className="w-full"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </section>
    </>
  )
}

function InfoRow({ icon, label, href }) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-tea-gold text-lg mt-0.5">{icon}</span>
      <span className="text-tea-ink/75 text-sm">{label}</span>
    </div>
  )
  return href ? <a href={href} className="hover:opacity-70 transition-opacity">{content}</a> : content
}
