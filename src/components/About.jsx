import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FiCode, FiServer, FiDatabase, FiLayout,
  FiGithub, FiLinkedin, FiMail
} from 'react-icons/fi'
import './About.css'

const techIcons = [
  { icon: <FiCode />, label: 'Frontend' },
  { icon: <FiServer />, label: 'Backend' },
  { icon: <FiDatabase />, label: 'Database' },
  { icon: <FiLayout />, label: 'UI/UX' },
]

export default function About() {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" style={{ background: 'var(--bg2)', padding: '100px 5%' }}>
      <div className="section" style={{ padding: 0 }}>
        <div ref={ref} className="reveal">
          <p className="section-subtitle" style={{ marginBottom: '0.5rem' }}>GET TO KNOW ME</p>
          <h2 className="section-title">About Me</h2>
          <div className="divider" />
        </div>

        <div className="about-grid">
          {/* Text side */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="about-intro">
              Hi, I'm <span className="highlight">Sneha Singh</span> — a motivated Full Stack Developer
              and an engineering student who loves building scalable and interactive digital products.
            </p>
            <p className="about-body">
              I am currently pursuing my B.Tech in Computer Science and Engineering at Lovely Professional University.
              I specialize in core technologies like <span className="highlight">Java</span>, <span className="highlight">JavaScript</span>,
              and <span className="highlight">Node.js</span>, and I'm always eager to solve complex problems and build efficient systems.
            </p>
            <p className="about-body">
              When I'm not pushing code, you'll find me exploring new frameworks, participating in hackathons,
              or continuously learning to expand my tech stack and skill set.
            </p>

            <div className="about-socials">
              <a href="https://github.com/bewithsneha" target="_blank" rel="noreferrer" className="social-btn">
                <FiGithub size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/-singh-sneha" target="_blank" rel="noreferrer" className="social-btn">
                <FiLinkedin size={18} /> LinkedIn
              </a>
              <a href="mailto:snehasinghcse31@gmail.com" className="social-btn">
                <FiMail size={18} /> Email
              </a>
            </div>
          </motion.div>

          {/* Cards side */}
          <motion.div
            className="about-cards"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {[
              { value: '3', label: 'Major Projects', color: 'var(--accent1)' },
              { value: '15+', label: 'Skills Mastered', color: 'var(--accent2)' },
              { value: '4', label: 'Certifications', color: 'var(--accent3)' },
              { value: '6.8', label: 'CGPA', color: '#f59e0b' },
            ].map(({ value, label, color }) => (
              <div key={label} className="glass about-card">
                <span className="card-value" style={{ color }}>{value}</span>
                <span className="card-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
