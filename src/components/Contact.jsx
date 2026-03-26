import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiGithub, FiLinkedin, FiMail, FiSend,
  FiTwitter, FiMapPin, FiPhone
} from 'react-icons/fi'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, submit to backend/email service
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  const socials = [
    { icon: <FiGithub size={22} />, label: 'GitHub', href: 'https://github.com/bewithsneha', color: '#fff' },
    { icon: <FiLinkedin size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/-singh-sneha', color: '#0a66c2' },
    { icon: <FiMail size={22} />, label: 'Email', href: 'mailto:snehasinghcse31@gmail.com', color: '#ea4335' },
  ]

  return (
    <section id="contact" style={{ padding: '100px 5%', background: 'var(--bg2)' }}>
      <div className="section" style={{ padding: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">LET'S CONNECT</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="divider" />
        </motion.div>

        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-heading">Let's build something amazing together</h3>
            <p className="contact-body">
              Whether you have a project in mind, want to collaborate, or just want to say hello —
              my inbox is always open. I'll get back to you within 24 hours.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <FiMail size={18} style={{ color: 'var(--accent2)' }} />
                <span>snehasinghcse31@gmail.com</span>
              </div>
              <div className="contact-detail">
                <FiMapPin size={18} style={{ color: 'var(--accent1)' }} />
                <span>India · Remote-First</span>
              </div>
              <div className="contact-detail">
                <FiPhone size={18} style={{ color: 'var(--accent3)' }} />
                <span>+91-6207499204</span>
              </div>
            </div>

            {/* Socials */}
            <div className="social-icons">
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass social-icon"
                  title={s.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  style={{ '--hover-color': s.color }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            className="glass contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                rows={6}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className={`btn-primary send-btn ${sent ? 'sent' : ''}`}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
                {sent ? '✓ Message Sent!' : <><FiSend size={16} /> Send Message</>}
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
