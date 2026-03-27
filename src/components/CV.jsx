import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiUpload, FiCheck, FiFile } from 'react-icons/fi'
import './CV.css'

export default function CV() {
  const [uploaded, setUploaded] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState('/cv.pdf')
  const inputRef = useRef()

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setDownloadUrl(url)
    setUploaded(file.name)
  }

  return (
    <section id="cv" style={{ padding: '100px 5%', background: 'var(--bg)' }}>
      <div className="section" style={{ padding: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">MY RESUME</p>
          <h2 className="section-title">Curriculum Vitae</h2>
          <div className="divider" />
        </motion.div>

        <div className="cv-wrapper">
          <motion.div
            className="glass cv-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow ring */}
            <div className="cv-glow" />

            <div className="cv-icon-wrap">
              <div className="cv-icon">
                <FiFile size={40} />
              </div>
            </div>

            <h3 className="cv-title">Sneha_Singh_CV.pdf</h3>
            <p className="cv-desc">
              Software Engineering Student • Full Stack Developer<br />
              Java · JavaScript · React · Node.js · MongoDB
            </p>

            <div className="cv-meta">
              {[['Format', 'PDF'], ['Updated', 'Mar 2026'], ['Pages', '1'], ['Size', '~180 KB']].map(([k, v]) => (
                <div key={k} className="meta-item">
                  <span className="meta-key">{k}</span>
                  <span className="meta-val">{v}</span>
                </div>
              ))}
            </div>

            <div className="cv-actions">
              {/* Download */}
              <a
                href={downloadUrl}
                download={uploaded || 'Sneha_Singh_CV.pdf'}
                className="btn-primary cv-btn"
              >
                <span className="cv-btn-inner">
                  <FiDownload size={18} />
                  Download CV
                </span>
              </a>

              {/* Upload */}
              <button
                className="btn-outline cv-btn"
                onClick={() => inputRef.current.click()}
              >
                {uploaded ? <FiCheck size={18} /> : <FiUpload size={18} />}
                {uploaded ? 'CV Updated!' : 'Upload New CV'}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
            </div>

            {uploaded && (
              <motion.p
                className="upload-notice"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ New CV loaded: <strong>{uploaded}</strong> — Click Download CV to save it.
              </motion.p>
            )}
          </motion.div>

          {/* Side info */}
          <div className="cv-highlights">
            {[
              { emoji: '🎓', title: 'Education', body: 'B.Tech CSE (6.80 CGPA)\nLovely Professional University' },
              { emoji: '🏫', title: 'Intermediate', body: 'Burnpur Riverside School, Asansol, West Bengal\n70% | April 2022 - March 2023' },
              { emoji: '📜', title: 'Matriculation', body: 'Burnpur Riverside School, Asansol, West Bengal\n88% | April 2020 - March 2021' },
              { emoji: '💼', title: 'Projects', body: 'Disaster Preparedness AI\nAmazon Clone e-Commerce' },
              { emoji: '🌍', title: 'Location', body: 'India (Remote-First)\nOpen to New Opportunities' },
              { emoji: '⚡', title: 'Availability', body: 'Currently Available\nReady for new roles' },
            ].map(item => (
              <motion.div
                key={item.title}
                className="glass highlight-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <span className="hl-emoji">{item.emoji}</span>
                <div>
                  <h4 className="hl-title">{item.title}</h4>
                  <p className="hl-body">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '80px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="section-subtitle">MY ACHIEVEMENTS</p>
            <h3 className="section-title" style={{ fontSize: '2rem' }}>Certifications</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {[
              { title: 'Deloitte Technology Virtual Job Simulation', issuer: 'Forage', link: 'https://drive.google.com/file/d/1FgT03zRo8reo_o8Z40LT5zPhmAGQ_zRq/view?usp=drive_link', icon: '💻' },
              { title: 'Data Structures and Algorithms in Java', issuer: 'Cipher\'s School', link: 'https://drive.google.com/file/d/1s7mZ-iashTJkOKypsJC0FRVEYf9cFjPk/view?usp=drive_link', icon: '🧩' },
              { title: 'Introduction to Hardware and Operating Systems', issuer: 'Coursera', link: 'https://drive.google.com/file/d/1RXmwRuBdcNVP4bLAzkULTAcxLWONXfeT/view?usp=drive_link', icon: '⚙️' },
              { title: 'Privacy and Security in Online Social Media', issuer: 'NPTEL', link: 'https://drive.google.com/file/d/1f6ng5xHAcHOxUo8Q_aZkd5MUCo0W5W83/view?usp=drive_link', icon: '🔒' },
            ].map((cert, i) => (
              <motion.a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="glass"
                style={{
                  padding: '25px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderTop: `3px solid var(--accent${(i % 3) + 1})`,
                }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div style={{ fontSize: '28px' }}>{cert.icon}</div>
                <h4 style={{ fontSize: '1.05rem', lineHeight: '1.4', color: 'var(--text)', fontWeight: '600' }}>
                  {cert.title}
                </h4>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>{cert.issuer}</span>
                  <span style={{ color: `var(--accent${(i % 3) + 1})`, fontSize: '0.8rem', fontWeight: 'bold' }}>VIEW →</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
