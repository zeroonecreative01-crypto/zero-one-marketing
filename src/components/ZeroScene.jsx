import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { getHeroProgress } from '../heroProgress.js'

function MarkGeometry() {
  const zeroRef = useRef(null)
  const oneRef = useRef(null)

  useFrame((state, delta) => {
    const progress = getHeroProgress()
    const pointerX = state.pointer.x
    const pointerY = state.pointer.y
    if (zeroRef.current) {
      const targetX = THREE.MathUtils.lerp(1, 0.28, progress)
      const targetY = THREE.MathUtils.lerp(1, 0.72, progress)
      zeroRef.current.scale.x = THREE.MathUtils.damp(zeroRef.current.scale.x, targetX, 3.5, delta)
      zeroRef.current.scale.y = THREE.MathUtils.damp(zeroRef.current.scale.y, targetY, 3.5, delta)
      zeroRef.current.rotation.y = THREE.MathUtils.damp(zeroRef.current.rotation.y, pointerX * 0.28, 2, delta)
      zeroRef.current.rotation.x = THREE.MathUtils.damp(zeroRef.current.rotation.x, -pointerY * 0.2, 2, delta)
      zeroRef.current.rotation.z = THREE.MathUtils.damp(zeroRef.current.rotation.z, progress * 0.16, 2, delta)
      zeroRef.current.position.x = THREE.MathUtils.damp(zeroRef.current.position.x, -progress * 0.68, 3.5, delta)
    }
    if (oneRef.current) {
      oneRef.current.scale.y = THREE.MathUtils.damp(oneRef.current.scale.y, Math.max(0.001, progress), 4, delta)
      oneRef.current.rotation.y = THREE.MathUtils.damp(oneRef.current.rotation.y, pointerX * 0.1, 2, delta)
      oneRef.current.position.x = THREE.MathUtils.damp(oneRef.current.position.x, 0.82 * progress, 3.5, delta)
    }
  })

  return (
    <Float speed={0.65} rotationIntensity={0.035} floatIntensity={0.12}>
      <group>
        <mesh ref={zeroRef}>
          <torusGeometry args={[1.15, 0.23, 48, 112]} />
          <meshPhysicalMaterial color="#ff7138" emissive="#a9330f" emissiveIntensity={0.12} metalness={0.68} roughness={0.22} clearcoat={0.85} clearcoatRoughness={0.2} />
        </mesh>
        <group ref={oneRef} position={[0.82, 0, 0]} scale={[1, 0.001, 1]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 2.2, 32]} />
            <meshPhysicalMaterial color="#ffc19d" emissive="#c44b18" emissiveIntensity={0.18} metalness={0.55} roughness={0.2} />
          </mesh>
          <mesh position={[-0.14, -0.78, 0]} rotation={[0, 0, -0.55]}>
            <cylinderGeometry args={[0.12, 0.12, 0.58, 24]} />
            <meshPhysicalMaterial color="#ffc19d" emissive="#c44b18" emissiveIntensity={0.12} metalness={0.55} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.06, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.13, 32]} />
            <meshPhysicalMaterial color="#ff7138" emissive="#a9330f" emissiveIntensity={0.12} metalness={0.68} roughness={0.22} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

export default function ZeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={2.3} color="#fff2e9" />
        <pointLight position={[-3, -1, 3]} intensity={17} color="#ff7138" distance={9} />
        <pointLight position={[3, 2, -2]} intensity={7} color="#8f3a1e" distance={8} />
        <MarkGeometry />
      </Suspense>
    </Canvas>
  )
}
