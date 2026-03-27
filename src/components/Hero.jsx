import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { FiDownload, FiGithub } from 'react-icons/fi'
import HeroScene from './HeroScene'
import './Hero.css'

const FULL_TEXT = 'Full Stack Developer'
const ROLES = ['Full Stack Developer', 'Software Engineer', 'Java Developer', 'Problem Solver']

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })
  const [typed, setTyped] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout
    if (!isDeleting) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 40)
      } else {
        setIsDeleting(false)
        setRoleIdx((i) => (i + 1) % ROLES.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [typed, isDeleting, roleIdx])

  return (
    <section id="hero" className="hero-section">
      {/* 3D Canvas background */}
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <HeroScene mouse={mouse} />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-text-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-badge"
          >
            <span className="badge-dot" />
            Available for Work
          </motion.div>

          <motion.h1
            className="hero-name glitch"
            data-text="SNEHA SINGH"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            SNEHA SINGH
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <span className="role-prefix">&gt; </span>
            <span className="typed-text">{typed}</span>
            <span className="cursor-blink">|</span>
          </motion.div>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Crafting immersive digital experiences with cutting-edge technologies.
            Turning complex problems into elegant, scalable solutions.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <Link to="projects" smooth duration={600} offset={-80}>
              <button className="btn-primary">
                <span>View Projects</span>
              </button>
            </Link>
            <Link to="cv" smooth duration={600} offset={-80}>
              <button className="btn-outline">
                <FiDownload size={16} />
                Download CV
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            {[['3', 'Projects'], ['15+', 'Skills'], ['4', 'Certifications'], ['6.8', 'CGPA']].map(([num, label]) => (
              <div key={label} className="stat-item">
                <span className="stat-number">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image Profile */}
        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="hero-image-glow"></div>
          <div className="hero-image-ring"></div>
          <div className="hero-image-frame">
            <img src="/profile.jpg" alt="Sneha Singh" className="hero-image" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <HiArrowDown size={20} />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
