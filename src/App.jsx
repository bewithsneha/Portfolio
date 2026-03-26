import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CV from './components/CV'
import Contact from './components/Contact'
import Cursor from './components/Cursor'

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CV />
        <Contact />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        borderTop: '1px solid var(--glass-border)',
        fontFamily: 'Orbitron, monospace',
        letterSpacing: '2px'
      }}>
        © 2024 SNEHA SINGH · FULL STACK DEVELOPER · BUILT WITH REACT + THREE.JS
      </footer>
    </>
  )
}

export default App
