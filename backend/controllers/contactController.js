import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'

export async function submitContact(req, res) {
  try {
    const { name, email, phone, message } = req.body

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' })
    }

    const contact = await Contact.create({ name, email, phone, message })

    // Fire-and-forget email notification — don't block the response on email delivery
    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        })

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.OWNER_EMAIL,
          subject: `New inquiry from ${name} — Janta Tea website`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
        })
      } catch (mailErr) {
        console.error('Email notification failed:', mailErr.message)
        // Inquiry is already saved in DB, so we don't fail the request just because email failed
      }
    }

    res.status(201).json({ success: true, data: contact })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' })
  }
}

export async function getContacts(req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, data: contacts })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch inquiries' })
  }
}
