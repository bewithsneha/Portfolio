import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 3000 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.04
      ref.current.rotation.y += delta * 0.06
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function TorusKnot() {
  const ref = useRef()
  const wireframe1 = useRef()
  const wireframe2 = useRef()

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3
      ref.current.rotation.y += delta * 0.2
      ref.current.rotation.z += delta * 0.1
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06
      ref.current.scale.setScalar(s)
    }
    if (wireframe1.current) {
      wireframe1.current.rotation.x -= delta * 0.15
      wireframe1.current.rotation.z += delta * 0.2
    }
    if (wireframe2.current) {
      wireframe2.current.rotation.y -= delta * 0.25
      wireframe2.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group>
      {/* Central torus knot */}
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.2, 0.38, 160, 16, 2, 3]} />
        <meshStandardMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.6}
          emissive="#7c3aed"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Outer icosahedron ring */}
      <mesh ref={wireframe1} scale={2.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Inner sphere */}
      <mesh ref={wireframe2} scale={0.8}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.25}
          emissive="#a855f7"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

function CameraController({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 1.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#7c3aed" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 5, -5]} intensity={0.6} color="#a855f7" />
      <CameraController mouse={mouse} />
      <Particles count={3000} />
      <TorusKnot />
    </>
  )
}
