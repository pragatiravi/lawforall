import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, ContactShadows, PresentationControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function GoldParticles({ count = 150 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#fbbf24"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function ConstitutionBook({ theme, scale = 1, position = [0, 0, 0] }: { theme: 'light' | 'dark', scale?: number, position?: [number, number, number] }) {
  const bookRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(t * 0.5) * 0.1 + 0.2;
      bookRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.05;
    }
  });

  const coverColor = theme === 'dark' ? '#1e1b4b' : '#2e1065';
  const goldColor = '#fbbf24';
  const pageColor = '#fef3c7';

  return (
    <group ref={bookRef} position={position} rotation={[0.05, 0.2, 0]} scale={scale}>
      {/* Book Body - Enhanced Leather Texture */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 2.2, 0.35]} />
        <meshPhysicalMaterial 
          color={coverColor} 
          roughness={0.6} 
          metalness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.5}
          sheen={1.5}
          sheenRoughness={0.4}
          sheenColor={coverColor}
        />
      </mesh>

      {/* Spine - Rounded with More Detailed Ribs */}
      <group position={[-0.8, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 2.2, 32, 1, false, Math.PI, Math.PI]} />
          <meshPhysicalMaterial color={coverColor} roughness={0.6} clearcoat={0.8} />
        </mesh>
        {/* Spine Ribs - More frequent and detailed */}
        {[-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9].map(y => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.18, 0.03, 16, 32, Math.PI]} />
            <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Pages (Edges) - More realistic paper stack look */}
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[1.5, 2.1, 0.3]} />
        <meshStandardMaterial color={pageColor} metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Gold Leaf Edge Detail - Top, Bottom, and Side */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.01, 2.1, 0.3]} />
        <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0.05, 1.05, 0]}>
        <boxGeometry args={[1.5, 0.01, 0.3]} />
        <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0.05, -1.05, 0]}>
        <boxGeometry args={[1.5, 0.01, 0.3]} />
        <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
      </mesh>

      {/* Ribbon Bookmark */}
      <mesh position={[0.2, -1.1, 0.1]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.1, 0.4, 0.01]} />
        <meshStandardMaterial color="#b91c1c" />
      </mesh>

      {/* Cover Design - Intricate Gold Border with Filigree */}
      <group position={[0, 0, 0.18]}>
        {/* Main Border */}
        <mesh>
          <planeGeometry args={[1.35, 1.85]} />
          <meshBasicMaterial color={goldColor} wireframe />
        </mesh>
        {/* Inner Border */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[1.2, 1.7]} />
          <meshBasicMaterial color={goldColor} wireframe />
        </mesh>
        {/* Corner Accents - Stylized L-shapes with more detail */}
        {[-0.6, 0.6].map(x => [-0.85, 0.85].map(y => (
          <group key={`${x}-${y}`} position={[x, y, 0.002]}>
            <mesh>
              <boxGeometry args={[0.25, 0.05, 0.01]} />
              <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.25, 0.05, 0.01]} />
              <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
            </mesh>
            {/* Small decorative sphere at corner */}
            <mesh position={[x > 0 ? -0.12 : 0.12, y > 0 ? -0.12 : 0.12, 0.01]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
            </mesh>
          </group>
        )))}
        
        {/* Central Emblem - Ashoka Chakra Placeholder */}
        <group position={[0, -0.5, 0.005]}>
          <mesh>
            <torusGeometry args={[0.2, 0.01, 16, 32]} />
            <meshStandardMaterial color={goldColor} metalness={1} />
          </mesh>
          {[...Array(24)].map((_, i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 12]}>
              <boxGeometry args={[0.01, 0.4, 0.005]} />
              <meshStandardMaterial color={goldColor} metalness={1} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Text on Cover - Enhanced Visibility and Depth */}
      <group position={[0, 0, 0.2]}>
        <Text
          position={[0, 0.6, 0.01]}
          fontSize={0.16}
          color={goldColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          textAlign="center"
          fontWeight="bold"
        >
          CONSTITUTION
          <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} emissive={goldColor} emissiveIntensity={0.3} />
        </Text>
        <Text
          position={[0, 0.3, 0.01]}
          fontSize={0.12}
          color={goldColor}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          OF
          <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} emissive={goldColor} emissiveIntensity={0.3} />
        </Text>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.2}
          color={goldColor}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          INDIA
          <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} emissive={goldColor} emissiveIntensity={0.3} />
        </Text>
      </group>
      
      {/* Subtle Back Glow - Enhanced for centering */}
      <mesh position={[0, 0, -0.3]} scale={[2.5, 3.2, 1]}>
        <planeGeometry />
        <meshBasicMaterial color={goldColor} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export function JusticeScale({ theme, scale = 1, position = [0, 0, 0] }: { theme: 'light' | 'dark', scale?: number, position?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const leftPan = useRef<THREE.Group>(null);
  const rightPan = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    }
    if (leftPan.current && rightPan.current) {
      const swing = Math.sin(t * 0.8) * 0.08;
      leftPan.current.rotation.z = swing;
      rightPan.current.rotation.z = -swing;
      
      // Counter-rotate the pans so they stay level
      leftPan.current.children.forEach(child => {
        if (child.name === 'pan-bowl') child.rotation.z = -swing;
      });
      rightPan.current.children.forEach(child => {
        if (child.name === 'pan-bowl') child.rotation.z = swing;
      });
    }
  });

  const stoneColor = theme === 'dark' ? '#f8fafc' : '#ffffff';
  const goldAccent = '#fbbf24';

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Central Pillar - More detailed base with steps */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 1.6, 32]} />
        <meshPhysicalMaterial color={stoneColor} roughness={0.1} metalness={0.1} clearcoat={1} />
      </mesh>
      {/* Tiered Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 0.1, 32]} />
        <meshPhysicalMaterial color={stoneColor} roughness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.1, 32]} />
        <meshPhysicalMaterial color={stoneColor} roughness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.1, 32]} />
        <meshPhysicalMaterial color={stoneColor} roughness={0.1} clearcoat={1} />
      </mesh>
      
      {/* Decorative Gold Rings on Pillar */}
      {[0.5, 1.0].map(y => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.09, 0.02, 16, 32]} />
          <meshStandardMaterial color={goldAccent} metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Top Ornament - More Ornate with Finial */}
      <group position={[0, 1.65, 0]}>
        <mesh>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color={goldAccent} metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <coneGeometry args={[0.06, 0.25, 16]} />
          <meshStandardMaterial color={goldAccent} metalness={1} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={goldAccent} metalness={1} />
        </mesh>
      </group>

      {/* Main Beam - Tapered and Detailed with Gold Bands */}
      <group position={[0, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[2.6, 0.06, 0.06]} />
          <meshStandardMaterial color={stoneColor} roughness={0.2} />
        </mesh>
        {/* Gold Bands on Beam */}
        {[-0.6, 0.6].map(x => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.05, 0.08, 0.08]} />
            <meshStandardMaterial color={goldAccent} metalness={1} />
          </mesh>
        ))}
        {/* Gold Tips */}
        {[-1.3, 1.3].map(x => (
          <mesh key={x} position={[x, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={goldAccent} metalness={1} />
          </mesh>
        ))}
      </group>

      {/* Left Pan Assembly */}
      <group ref={leftPan} position={[-1.25, 1.5, 0]}>
        {/* Chains - More detailed appearance */}
        {[0, 120, 240].map((angle) => (
          <group key={angle} rotation={[0, THREE.MathUtils.degToRad(angle), 0]}>
            <mesh position={[0.35, -0.65, 0]} rotation={[0, 0, Math.PI / 9]}>
              <cylinderGeometry args={[0.008, 0.008, 1.3, 8]} />
              <meshStandardMaterial color={goldAccent} metalness={1} roughness={0.1} />
            </mesh>
          </group>
        ))}
        {/* Pan Bowl - Deeper and more polished */}
        <mesh name="pan-bowl" position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.6, 0.35, 0.15, 32, 1, true]} />
          <meshPhysicalMaterial 
            color={stoneColor} 
            metalness={0.2} 
            roughness={0.1} 
            side={THREE.DoubleSide}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Right Pan Assembly */}
      <group ref={rightPan} position={[1.25, 1.5, 0]}>
        {/* Chains */}
        {[0, 120, 240].map((angle) => (
          <group key={angle} rotation={[0, THREE.MathUtils.degToRad(angle), 0]}>
            <mesh position={[0.35, -0.65, 0]} rotation={[0, 0, Math.PI / 9]}>
              <cylinderGeometry args={[0.008, 0.008, 1.3, 8]} />
              <meshStandardMaterial color={goldAccent} metalness={1} roughness={0.1} />
            </mesh>
          </group>
        ))}
        {/* Pan Bowl */}
        <mesh name="pan-bowl" position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.6, 0.35, 0.15, 32, 1, true]} />
          <meshPhysicalMaterial 
            color={stoneColor} 
            metalness={0.2} 
            roughness={0.1} 
            side={THREE.DoubleSide}
            clearcoat={1}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Hero3D({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        {/* Lighting */}
        <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={theme === 'dark' ? 2 : 2.5} 
          castShadow 
        />
        <pointLight position={[-10, 5, -5]} intensity={1} color="#4f46e5" />
        <pointLight position={[10, -5, 5]} intensity={1} color="#fbbf24" />
        <pointLight position={[0, 5, 5]} intensity={1.5} color="#818cf8" />
        <spotLight position={[0, 10, 0]} intensity={3} angle={0.5} penumbra={1} color="#ffffff" castShadow />

        <React.Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0.1, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            snap
          >
            <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
              <ConstitutionBook theme={theme} position={[0, 0, 0]} scale={1.4} />
            </Float>
            <GoldParticles count={250} />
          </PresentationControls>
          
          {/* Grounding Shadows */}
          <ContactShadows 
            position={[0, -2.8, 0]} 
            opacity={0.5} 
            scale={12} 
            blur={2.8} 
            far={4.5} 
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
