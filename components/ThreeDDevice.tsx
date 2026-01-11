
import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  Float, 
  MeshTransmissionMaterial, 
  Html,
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import { X, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Fix: Defining Three.js intrinsic elements as PascalCase constants to bypass JSX type errors when JSX.IntrinsicElements is not properly augmented
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const PlaneGeometry = 'planeGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;
const Color = 'color' as any;

const ResQDevice = ({ exploded = false }: { exploded?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useFrame((state) => {
    // Only rotate if nothing is selected to allow easier inspection
    if (groupRef.current && selected === null) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const hotspot = (pos: [number, number, number], label: string, description: string, index: number) => {
    const isSelected = selected === index;
    const isHovered = hovered === index;

    return (
      <Html position={pos} distanceFactor={10} zIndexRange={[10, 0]}>
        <div className="relative flex items-center justify-center">
          {/* Pulsing Base Ring */}
          <div 
            className={`cursor-pointer w-6 h-6 rounded-full border-2 border-accent/50 flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125 border-accent' : 'hover:scale-110'}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(isSelected ? null : index);
            }}
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected || isHovered ? 'bg-accent scale-150' : 'bg-accent/40'}`} />
            {!isSelected && (
              <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20" />
            )}
          </div>

          {/* Tooltip Content */}
          <AnimatePresence>
            {(isHovered || isSelected) && (
              <motion.div 
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 30, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className={`absolute left-0 pointer-events-auto bg-dark/95 backdrop-blur-xl border border-accent/30 p-4 rounded-2xl whitespace-nowrap shadow-2xl z-50 min-w-[240px] ${isSelected ? 'ring-2 ring-accent/20' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-display font-bold text-accent uppercase tracking-widest">{label}</span>
                  </div>
                  {isSelected && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelected(null); }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X size={14} className="text-light/40" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-light/70 whitespace-normal max-w-[200px]">
                  {description}
                </p>
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-tighter text-secondary font-bold">Hardware: Certified</span>
                    <Info size={12} className="text-secondary opacity-50" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    );
  };

  return (
    <Group ref={groupRef} onClick={() => setSelected(null)}>
      {/* Main Body */}
      <Mesh position={[0, exploded ? 1 : 0, 0]}>
        <BoxGeometry args={[2, 4, 0.8]} />
        <MeshTransmissionMaterial 
          backside 
          thickness={0.5} 
          roughness={0.1} 
          transmission={1} 
          ior={1.2} 
          chromaticAberration={0.02} 
          anisotropy={0.1} 
          color="#1F6FA3"
        />
      </Mesh>

      {/* Internal "Circuit" Board */}
      <Mesh position={[0, exploded ? 1 : 0, 0]} scale={[0.9, 0.9, 0.5]}>
        <BoxGeometry args={[1.8, 3.8, 0.2]} />
        <MeshStandardMaterial color="#1FB9A6" emissive="#1FB9A6" emissiveIntensity={0.5} />
        {hotspot([0, 0, 0.2], "RL-OS Core Processor", "Dual-core custom silicon designed for auto-healing mesh routing and hardware-level AES encryption.", 5)}
      </Mesh>

      {/* Antenna */}
      <Group position={[0.7, exploded ? 3.5 : 2, 0]}>
        <Mesh>
          <CylinderGeometry args={[0.05, 0.05, 1.2]} />
          <MeshStandardMaterial color="#8AF1E1" emissive="#8AF1E1" emissiveIntensity={2} />
        </Mesh>
        {hotspot([0, 0.6, 0], "High-Gain Antenna", "Extended reach LoRa transceiver capable of multi-kilometer signal propagation in zero-infrastructure environments.", 1)}
      </Group>

      {/* Screen Area */}
      <Mesh position={[0, exploded ? 2 : 1, 0.41]}>
        <PlaneGeometry args={[1.6, 1.2]} />
        <MeshStandardMaterial color="#050B0E" emissive="#1FB9A6" emissiveIntensity={0.2} />
        {hotspot([0, 0, 0], "Emergency OLED", "Ultra-low power display for critical breadcrumb navigation and incoming high-priority mesh alerts.", 2)}
      </Mesh>

      {/* Button Panel */}
      <Group position={[0, exploded ? 0 : -1.2, 0.45]}>
        <Mesh>
          <BoxGeometry args={[1.5, 0.8, 0.1]} />
          <MeshStandardMaterial color="#111" />
        </Mesh>
        {hotspot([0, 0, 0], "Tactile SOS Array", "Glove-friendly physical inputs for immediate distress broadcasting and manual channel cycling.", 3)}
      </Group>

      {/* Bottom Battery Unit */}
      <Mesh position={[0, exploded ? -2 : -1.9, 0]}>
        <BoxGeometry args={[2, 0.5, 0.8]} />
        <MeshStandardMaterial color="#0a0a0a" roughness={0.5} />
        {hotspot([0, 0, 0], "72hr Power Cell", "Advanced cold-resistant lithium unit optimized for high-reliability in sub-zero operational climates.", 4)}
      </Mesh>
    </Group>
  );
};

const Viewer3D: React.FC<{ exploded?: boolean }> = ({ exploded = false }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 2, 5], fov: 35 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <Color attach="background" args={['#050B0E']} />
        <AmbientLight intensity={0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <PointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
              <p className="text-accent font-display font-medium tracking-widest animate-pulse">LOADING CORE ASSETS</p>
            </div>
          </Html>
        }>
          <Stage environment="city" intensity={0.6} contactShadow={false}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <ResQDevice exploded={exploded} />
            </Float>
          </Stage>
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          <OrbitControls makeDefault enablePan={true} enableZoom={true} minDistance={5} maxDistance={20} />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-none">
        <div className="bg-dark/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">ResQLink Device</span>
            <span className="text-sm font-medium text-light/90">Model: RQL-X1 Legacy</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-light/70 uppercase tracking-tighter">Diagnostic Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer3D;
