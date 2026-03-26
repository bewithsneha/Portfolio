import { useState } from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiPython, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiNextdotjs, SiTailwindcss, SiGraphql, SiExpress, SiFirebase } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { FiUsers, FiMessageSquare, FiZap, FiAward } from 'react-icons/fi'
import './Skills.css'

const skills = [
  { icon: <SiReact />, label: 'React', level: 95, color: '#61dafb' },
  { icon: <SiNextdotjs />, label: 'Next.js', level: 88, color: '#ffffff' },
  { icon: <SiJavascript />, label: 'JavaScript', level: 95, color: '#f7df1e' },
  { icon: <SiTypescript />, label: 'TypeScript', level: 85, color: '#3178c6' },
  { icon: <SiTailwindcss />, label: 'Tailwind', level: 92, color: '#06b6d4' },
  { icon: <SiNodedotjs />, label: 'Node.js', level: 90, color: '#68a063' },
  { icon: <SiExpress />, label: 'Express', level: 88, color: '#ffffff' },
  { icon: <SiPython />, label: 'Python', level: 75, color: '#3776ab' },
  { icon: <SiGraphql />, label: 'GraphQL', level: 78, color: '#e535ab' },
  { icon: <SiPostgresql />, label: 'PostgreSQL', level: 85, color: '#336791' },
  { icon: <SiMongodb />, label: 'MongoDB', level: 82, color: '#47a248' },
  { icon: <SiRedis />, label: 'Redis', level: 70, color: '#dc382d' },
  { icon: <SiFirebase />, label: 'Firebase', level: 80, color: '#ffca28' },
  { icon: <SiDocker />, label: 'Docker', level: 75, color: '#2496ed' },
  { icon: <FaAws />, label: 'AWS', level: 70, color: '#ff9900' },
  { icon: <SiGit />, label: 'Git', level: 90, color: '#f05033' },
  { icon: <FiMessageSquare />, label: 'Communication', level: 90, color: '#00d1ff' },
  { icon: <FiZap />, label: 'Problem Solving', level: 92, color: '#ffd700' },
  { icon: <FiUsers />, label: 'Teamwork', level: 88, color: '#ff4d4d' },
  { icon: <FiAward />, label: 'Leadership', level: 85, color: '#a855f7' },
]

const categories = [
  { label: 'Frontend', items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Python', 'GraphQL'] },
  { label: 'Soft Skills', items: ['Communication', 'Problem Solving', 'Teamwork', 'Leadership'] },
  { label: 'DevOps', items: ['Docker', 'AWS', 'Git'] },
]

export default function Skills() {
  const [hoveredNode, setHoveredNode] = useState(null)

  const CENTER_X = 500
  const CENTER_Y = 400
  const CAT_RADIUS = 180
  const SKILL_RADIUS = 140

  const treeData = categories.map((cat, i) => {
    // 4 categories -> -90, 0, 90, 180 degrees
    const angle = (i * (Math.PI * 2)) / categories.length - Math.PI / 2
    const cx = CENTER_X + Math.cos(angle) * CAT_RADIUS
    const cy = CENTER_Y + Math.sin(angle) * CAT_RADIUS

    const skillNodes = cat.items.map((itemName, j) => {
      const skillObj = skills.find(s => s.label === itemName)
      if (!skillObj) return null

      // Fan out skills away from the center
      const angleSpread = Math.PI * 0.6 // 108 degrees spread
      const startAngle = angle - angleSpread / 2
      const step = cat.items.length > 1 ? angleSpread / (cat.items.length - 1) : 0
      const skillAngle = startAngle + j * step

      const sx = cx + Math.cos(skillAngle) * SKILL_RADIUS
      const sy = cy + Math.sin(skillAngle) * SKILL_RADIUS

      return { ...skillObj, x: sx, y: sy, parentX: cx, parentY: cy, parentLabel: cat.label }
    }).filter(Boolean)

    return { ...cat, x: cx, y: cy, skills: skillNodes }
  })

  // Framer motion variants to draw SVG lines smoothly
  const lineVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }

  return (
    <section id="skills" style={{ padding: '100px 0', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="section" style={{ padding: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: '0 5%' }}
        >
          <p className="section-subtitle">INTERACTIVE MAP</p>
          <h2 className="section-title">Skill Tree</h2>
          <div className="divider" />
        </motion.div>

        <div className="skills-tree-container">
          <div className="skills-tree-wrapper">
            
            {/* SVG Layer for animated branches */}
            <svg className="tree-svg-layer" width="1000" height="800">
              <motion.g initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {treeData.map((cat, i) => (
                  <g key={`lines-${cat.label}`}>
                    {/* Line from center to Category */}
                    <motion.line
                      x1={CENTER_X} y1={CENTER_Y}
                      x2={cat.x} y2={cat.y}
                      className={`tree-branch ${hoveredNode === cat.label || hoveredNode === 'center' ? 'active' : ''}`}
                      variants={lineVariant}
                    />
                    {/* Lines from Category to Skills */}
                    {cat.skills.map((skill, j) => {
                      const isActive = hoveredNode === skill.label || hoveredNode === cat.label || hoveredNode === 'center'
                      return (
                        <motion.line
                          key={skill.label}
                          x1={cat.x} y1={cat.y}
                          x2={skill.x} y2={skill.y}
                          className={`tree-branch ${isActive ? 'active' : ''}`}
                          variants={lineVariant}
                        />
                      )
                    })}
                  </g>
                ))}
              </motion.g>
            </svg>

            {/* HTML Layer for interactive nodes */}
            <div className="tree-html-layer" style={{ width: '1000px', height: '800px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
              
              {/* Central Core Node */}
              <motion.div
                className="tree-node center-node"
                style={{ top: CENTER_Y, left: CENTER_X }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                onHoverStart={() => setHoveredNode('center')}
                onHoverEnd={() => setHoveredNode(null)}
              >
                <h3>TECH<br/>STACK</h3>
              </motion.div>

              {/* Category Nodes & Skill Nodes */}
              {treeData.map((cat, i) => (
                <div key={`nodes-${cat.label}`}>
                  {/* Category Node */}
                  <motion.div
                    className="tree-node cat-node"
                    style={{ top: cat.y, left: cat.x }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.6 + i * 0.1 }}
                    onHoverStart={() => setHoveredNode(cat.label)}
                    onHoverEnd={() => setHoveredNode(null)}
                  >
                    <span className="cat-label">{cat.label}</span>
                  </motion.div>

                  {/* Skill Nodes */}
                  {cat.skills.map((skill, j) => (
                    <motion.div
                      key={skill.label}
                      className="tree-node skill-node"
                      style={{ 
                        top: skill.y, left: skill.x, 
                        borderColor: hoveredNode === skill.label ? skill.color : 'rgba(255,255,255,0.1)' 
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 1.2 + j * 0.05 + i * 0.1 }}
                      onHoverStart={() => setHoveredNode(skill.label)}
                      onHoverEnd={() => setHoveredNode(null)}
                      whileHover={{ scale: 1.25, zIndex: 10 }}
                    >
                      <div className="skill-icon" style={{ color: skill.color, filter: `drop-shadow(0 0 5px ${skill.color})` }}>
                        {skill.icon}
                      </div>
                      <span className="skill-label">{skill.label}</span>
                    </motion.div>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
