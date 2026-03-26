import { useState } from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    title: 'Disaster Preparedness Platform',
    desc: 'Web platform enhancing disaster preparedness with simulation-based learning and AI-powered risk prediction using NDMA datasets and real-time P2P communication.',
    tags: ['FastAPI', 'MongoDB', 'AWS', 'WebRTC', 'Hugging Face'],
    tagColors: ['tag-violet', 'tag-cyan', 'tag-pink', 'tag-violet', 'tag-cyan'],
    live: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
    accent: '#7c3aed',
    year: '2025',
  },
  {
    title: 'Stock Trading Platform',
    desc: 'A real-time stock market analysis and trading platform featuring live data visualization, portfolio management, and secure transaction simulations with multi-indicator charts.',
    tags: ['React', 'Node.js', 'Socket.io', 'Chart.js', 'PostgreSQL'],
    tagColors: ['tag-violet', 'tag-cyan', 'tag-pink', 'tag-violet', 'tag-cyan'],
    live: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #06b6d422, #a855f722)',
    accent: '#06b6d4',
    year: '2025',
  },
  {
    title: 'Reminder & Event Manager',
    desc: 'Java-based reminder and event management system using OOPs principles, featuring a clean console interface for optimal data organization and modular retrieval.',
    tags: ['Java', 'OOPs', 'CLI'],
    tagColors: ['tag-pink', 'tag-violet', 'tag-cyan'],
    live: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #a855f722, #7c3aed22)',
    accent: '#a855f7',
    year: '2024',
  },
]

export default function Projects() {
  const [hovered, setHovered] = useState(null)
  const [tilt, setTilt] = useState({})

  const handleMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ [idx]: { x: y * 12, y: -x * 12 } })
  }

  const handleMouseLeave = (idx) => {
    setHovered(null)
    setTilt({ [idx]: { x: 0, y: 0 } })
  }

  return (
    <section id="projects" style={{ padding: '100px 5%', background: 'var(--bg2)' }}>
      <div className="section" style={{ padding: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">WHAT I'VE BUILT</p>
          <h2 className="section-title">Projects</h2>
          <div className="divider" />
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => {
            const t = tilt[i] || { x: 0, y: 0 }
            return (
              <motion.div
                key={project.title}
                className="project-card-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseMove={(e) => { setHovered(i); handleMouseMove(e, i) }}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <div 
                  className={`project-card glass ${hovered === i ? 'is-hovered' : ''}`}
                  style={{
                    transform: `perspective(1000px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
                    '--accent': project.accent,
                    '--gradient': project.gradient
                  }}
                >
                  {/* Layered Decorative Elements */}
                  <div className="card-layer card-layer-1" />
                  <div className="card-layer card-layer-2" />
                  
                  <div className="card-content-3d">
                    {/* Top bar */}
                    <div className="card-top">
                      <div className="card-dots">
                        <span style={{ background: '#ff5f57' }} />
                        <span style={{ background: '#ffbd2e' }} />
                        <span style={{ background: '#28c840' }} />
                      </div>
                      <span className="card-year">{project.year}</span>
                    </div>

                    {/* Content */}
                    <h3 className="card-title">
                      {project.title}
                    </h3>
                    <p className="card-desc">{project.desc}</p>

                    {/* Tags */}
                    <div className="card-tags">
                      {project.tags.map((tag, j) => (
                        <span key={tag} className={`tag ${project.tagColors[j]}`}>{tag}</span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="card-links">
                      <a href={project.github} className="card-link" target="_blank" rel="noreferrer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </a>
                      <a href={project.live} className="card-link card-link-live" style={{ color: project.accent, borderColor: `${project.accent}50` }} target="_blank" rel="noreferrer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
