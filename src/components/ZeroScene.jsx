import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { getHeroProgress } from '../heroProgress.js'

function ParticleField() {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const values = new Float32Array(420 * 3)
    for (let i = 0; i < 420; i += 1) {
      const radius = 2.2 + Math.random() * 2.4
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - .5) * 4.8
      values[i * 3] = Math.cos(angle) * radius
      values[i * 3 + 1] = y
      values[i * 3 + 2] = Math.sin(angle) * radius
    }
    return values
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    const progress = getHeroProgress()
    ref.current.rotation.y += delta * (.045 + progress * .08)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * .05, 2, delta)
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, -progress * .8, 3, delta)
  })

  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={420} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#ff7138" size={0.022} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function MarkGeometry() {
  const zeroRef = useRef(null)
  const oneRef = useRef(null)
  const coreRef = useRef(null)

  useFrame((state, delta) => {
    const progress = getHeroProgress()
    const px = state.pointer.x
    const py = state.pointer.y

    if (zeroRef.current) {
      zeroRef.current.scale.x = THREE.MathUtils.damp(zeroRef.current.scale.x, THREE.MathUtils.lerp(1, .42, progress), 3.2, delta)
      zeroRef.current.scale.y = THREE.MathUtils.damp(zeroRef.current.scale.y, THREE.MathUtils.lerp(1, .78, progress), 3.2, delta)
      zeroRef.current.rotation.y = THREE.MathUtils.damp(zeroRef.current.rotation.y, px * .34, 2.2, delta)
      zeroRef.current.rotation.x = THREE.MathUtils.damp(zeroRef.current.rotation.x, -py * .22, 2.2, delta)
      zeroRef.current.rotation.z = THREE.MathUtils.damp(zeroRef.current.rotation.z, progress * .28, 2.2, delta)
      zeroRef.current.position.x = THREE.MathUtils.damp(zeroRef.current.position.x, -progress * .58, 3, delta)
    }

    if (oneRef.current) {
      oneRef.current.scale.y = THREE.MathUtils.damp(oneRef.current.scale.y, Math.max(.001, progress), 4.6, delta)
      oneRef.current.position.x = THREE.MathUtils.damp(oneRef.current.position.x, .82 * progress, 3, delta)
      oneRef.current.rotation.y = THREE.MathUtils.damp(oneRef.current.rotation.y, px * .12, 2, delta)
    }

    if (coreRef.current) {
      coreRef.current.rotation.z += delta * .25
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, 1 + Math.sin(state.clock.elapsedTime * 1.5) * .025 + progress * .15, 3, delta))
    }
  })

  return (
    <Float speed={.65} rotationIntensity={.035} floatIntensity={.13}>
      <group>
        <mesh ref={zeroRef}>
          <torusGeometry args={[1.15, .22, 56, 128]} />
          <meshPhysicalMaterial color="#ff7138" emissive="#a83212" emissiveIntensity={.17} metalness={.74} roughness={.18} clearcoat={1} clearcoatRoughness={.15} />
        </mesh>
        <mesh ref={coreRef} scale={[.68, .68, .68]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial color="#19100c" emissive="#ff7138" emissiveIntensity={.06} metalness={.82} roughness={.28} wireframe />
        </mesh>
        <group ref={oneRef} position={[.82, 0, 0]} scale={[1, .001, 1]}>
          <mesh position={[0, .1, 0]}><cylinderGeometry args={[.13, .13, 2.2, 36]} /><meshPhysicalMaterial color="#ffc19d" emissive="#c44b18" emissiveIntensity={.18} metalness={.62} roughness={.17} clearcoat={.7} /></mesh>
          <mesh position={[-.14, -.78, 0]} rotation={[0, 0, -.55]}><cylinderGeometry args={[.12, .12, .58, 28]} /><meshPhysicalMaterial color="#ffc19d" emissive="#c44b18" emissiveIntensity={.14} metalness={.62} roughness={.17} /></mesh>
          <mesh position={[0, -1.06, 0]}><cylinderGeometry args={[.46, .46, .13, 36]} /><meshPhysicalMaterial color="#ff7138" emissive="#a9330f" emissiveIntensity={.15} metalness={.72} roughness={.18} /></mesh>
        </group>
      </group>
    </Float>
  )
}

export default function ZeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#090909"]} />
        <ambientLight intensity={.6} />
        <directionalLight position={[4, 5, 5]} intensity={2.4} color="#fff2e9" />
        <pointLight position={[-3, -1, 3]} intensity={19} color="#ff7138" distance={9} />
        <pointLight position={[3, 2, -2]} intensity={8} color="#8f3a1e" distance={8} />
        <ParticleField />
        <MarkGeometry />
      </Suspense>
    </Canvas>
  )
}