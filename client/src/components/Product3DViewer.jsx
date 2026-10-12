import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Center, Html } from '@react-three/drei';
import { RotateCw, Maximize2, Minimize2, Sparkles } from 'lucide-react';

// ─── Loading spinner (shown while Three.js compiles the scene) ───────────────
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 bg-black/80 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-md">
        <div className="w-5 h-5 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-[11px] font-bold text-white tracking-wide">Rendering 3D Model…</span>
      </div>
    </Html>
  );
}

// ─── CRICKET JERSEY ──────────────────────────────────────────────────────────
// Recognisable features: long sleeves, rounded hem, white collar strip,
// cream/white body with amber/green accent panels (traditional cricket look).
function CricketJerseyMesh({ color = '#F5F0E8', playerNumber = '10', playerName = 'AR SPORTS' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.4;
    }
  });

  const accentColor = '#84CC16';   // lime green accent — cricket kit trim
  const collarColor = '#FFFFFF';
  const cuffColor   = '#D97706';   // amber cuffs — traditional cricket detail

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* ── Main torso (slightly longer, straighter cut for cricket) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.5, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
      </mesh>

      {/* ── Chest accent stripe (horizontal — cricket panel) */}
      <mesh position={[0, 0.55, 0.285]}>
        <boxGeometry args={[1.62, 0.22, 0.02]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.28, 0.285]}>
        <boxGeometry args={[1.62, 0.06, 0.02]} />
        <meshStandardMaterial color={cuffColor} roughness={0.3} />
      </mesh>

      {/* ── Round-neck / polo collar */}
      <mesh position={[0, 1.27, 0]}>
        <cylinderGeometry args={[0.36, 0.42, 0.18, 32]} />
        <meshStandardMaterial color={collarColor} roughness={0.2} />
      </mesh>
      {/* Collar stripe */}
      <mesh position={[0, 1.19, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.055, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} />
      </mesh>

      {/* ── Long left sleeve */}
      <mesh position={[-1.15, 0.62, 0]} rotation={[0, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.38, 1.1, 20]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      {/* Left cuff (amber) */}
      <mesh position={[-1.45, 0.19, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.31, 0.31, 0.15, 20]} />
        <meshStandardMaterial color={cuffColor} roughness={0.3} />
      </mesh>

      {/* ── Long right sleeve */}
      <mesh position={[1.15, 0.62, 0]} rotation={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.38, 1.1, 20]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      {/* Right cuff (amber) */}
      <mesh position={[1.45, 0.19, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.31, 0.31, 0.15, 20]} />
        <meshStandardMaterial color={cuffColor} roughness={0.3} />
      </mesh>

      {/* ── Club crest badge (left chest) */}
      <mesh position={[-0.42, 0.72, 0.29]}>
        <boxGeometry args={[0.28, 0.28, 0.03]} />
        <meshStandardMaterial color="#0B0F19" emissive={accentColor} emissiveIntensity={0.4} roughness={0.1} />
      </mesh>

      {/* ── Back number plate */}
      <mesh position={[0, 0.35, -0.29]}>
        <boxGeometry args={[0.65, 0.85, 0.02]} />
        <meshStandardMaterial color="#0B0F19" roughness={0.3} />
      </mesh>
      {/* Back name bar */}
      <mesh position={[0, 0.87, -0.29]}>
        <boxGeometry args={[0.9, 0.2, 0.02]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} />
      </mesh>

      {/* ── Shirt tail (rounded bottom edge) */}
      <mesh position={[0, -1.32, 0]}>
        <boxGeometry args={[1.62, 0.12, 0.56]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ─── FOOTBALL JERSEY ─────────────────────────────────────────────────────────
// Recognisable features: short sleeves, side mesh panels, V-neck, fitted athletic cut.
function FootballJerseyMesh({ color = '#1A56DB', playerNumber = '10', playerName = 'AR SPORTS' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.38;
    }
  });

  const sidePanel  = '#0B1327';    // dark side panel (typical football kit)
  const accentColor = '#FF5722';   // orange accent
  const collarColor = '#FFFFFF';

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* ── Main torso (fitted, slightly narrower waist) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.55, 2.25, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.12} />
      </mesh>

      {/* ── Side mesh panels (left) — darker panel strip */}
      <mesh position={[-0.65, 0, 0.31]}>
        <boxGeometry args={[0.28, 2.22, 0.02]} />
        <meshStandardMaterial color={sidePanel} roughness={0.25} />
      </mesh>
      {/* Side panels (right) */}
      <mesh position={[0.65, 0, 0.31]}>
        <boxGeometry args={[0.28, 2.22, 0.02]} />
        <meshStandardMaterial color={sidePanel} roughness={0.25} />
      </mesh>

      {/* ── V-neck collar */}
      <mesh position={[0, 1.16, 0.31]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.7, 0.22, 0.06]} />
        <meshStandardMaterial color={collarColor} roughness={0.2} />
      </mesh>
      {/* V-neck collar ring */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
        <meshStandardMaterial color={collarColor} roughness={0.2} />
      </mesh>

      {/* ── Short left sleeve */}
      <mesh position={[-1.12, 0.82, 0]} rotation={[0, 0, 0.42]} castShadow>
        <cylinderGeometry args={[0.33, 0.4, 0.72, 20]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Left sleeve accent band */}
      <mesh position={[-1.33, 0.52, 0]} rotation={[0, 0, 0.42]}>
        <cylinderGeometry args={[0.41, 0.41, 0.12, 20]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} />
      </mesh>

      {/* ── Short right sleeve */}
      <mesh position={[1.12, 0.82, 0]} rotation={[0, 0, -0.42]} castShadow>
        <cylinderGeometry args={[0.33, 0.4, 0.72, 20]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Right sleeve accent band */}
      <mesh position={[1.33, 0.52, 0]} rotation={[0, 0, -0.42]}>
        <cylinderGeometry args={[0.41, 0.41, 0.12, 20]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} />
      </mesh>

      {/* ── Club crest badge */}
      <mesh position={[-0.42, 0.68, 0.32]}>
        <boxGeometry args={[0.3, 0.3, 0.03]} />
        <meshStandardMaterial color="#0B0F19" emissive={accentColor} emissiveIntensity={0.4} roughness={0.1} />
      </mesh>

      {/* ── Front squad number */}
      <mesh position={[0.25, 0.4, 0.32]}>
        <boxGeometry args={[0.35, 0.45, 0.02]} />
        <meshStandardMaterial color={collarColor} roughness={0.25} />
      </mesh>

      {/* ── Back squad number plate */}
      <mesh position={[0, 0.38, -0.32]}>
        <boxGeometry args={[0.62, 0.8, 0.02]} />
        <meshStandardMaterial color={collarColor} roughness={0.3} />
      </mesh>
      {/* Back name bar */}
      <mesh position={[0, 0.88, -0.32]}>
        <boxGeometry args={[0.85, 0.18, 0.02]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} />
      </mesh>

      {/* ── Hem accent stripe at bottom */}
      <mesh position={[0, -1.14, 0]}>
        <boxGeometry args={[1.56, 0.1, 0.61]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ─── CRICKET BAT ─────────────────────────────────────────────────────────────
function CricketBatMesh() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.55;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.4, 0]} rotation={[0.08, 0, -0.05]}>
      {/* Willow blade */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.72, 2.4, 0.26]} />
        <meshStandardMaterial color="#D9A066" roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Toe guard */}
      <mesh position={[0, -0.98, 0]}>
        <boxGeometry args={[0.73, 0.1, 0.27]} />
        <meshStandardMaterial color="#0B0F19" roughness={0.6} />
      </mesh>
      {/* Cane handle */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.12, 0.13, 1.25, 24]} />
        <meshStandardMaterial color="#FF5722" roughness={0.7} />
      </mesh>
      {/* Grip band */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.125, 0.125, 0.25, 24]} />
        <meshStandardMaterial color="#84CC16" roughness={0.8} />
      </mesh>
      {/* Brand sticker */}
      <mesh position={[0, 0.95, 0.14]}>
        <boxGeometry args={[0.58, 0.75, 0.02]} />
        <meshStandardMaterial color="#0B0F19" emissive="#FF5722" emissiveIntensity={0.2} metalness={0.4} />
      </mesh>
    </group>
  );
}

// ─── SPORTS BALL (cricket leather / football) ────────────────────────────────
function SportsBallMesh() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.35;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.55;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshStandardMaterial color="#DC2626" roughness={0.25} metalness={0.15} />
      </mesh>
      {/* Seam */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.23, 0.045, 16, 96]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      {/* Gold logo */}
      <mesh position={[0, 0, 1.23]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ─── Model selector ──────────────────────────────────────────────────────────
function ModelSelector({ modelType, color, playerNumber, playerName }) {
  switch (modelType) {
    case 'cricket-bat':     return <CricketBatMesh />;
    case 'ball':            return <SportsBallMesh />;
    case 'cricket-jersey':  return <CricketJerseyMesh  color={color} playerNumber={playerNumber} playerName={playerName} />;
    case 'football-jersey': return <FootballJerseyMesh color={color} playerNumber={playerNumber} playerName={playerName} />;
    default:                return <CricketJerseyMesh  color={color} playerNumber={playerNumber} playerName={playerName} />;
  }
}

// ─── Model label badge ───────────────────────────────────────────────────────
const MODEL_LABELS = {
  'cricket-bat':     '🏏 Cricket Bat',
  'ball':            '🔴 Match Ball',
  'cricket-jersey':  '👕 Cricket Shirt',
  'football-jersey': '⚽ Football Kit',
};

// ─── Main exported component ─────────────────────────────────────────────────
export default function Product3DViewer({
  modelType = 'cricket-jersey',
  color = '#84CC16',
  playerNumber = '10',
  playerName = 'AR SPORTS',
  heightClass = 'h-80 sm:h-96 md:h-[460px]',
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsRef = useRef();

  const handleResetView = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  const label = MODEL_LABELS[modelType] || '3D Model';

  return (
    <div
      className={`relative w-full ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen bg-black/95 p-4 flex items-center justify-center'
          : heightClass
      } rounded-2xl overflow-hidden bg-gradient-to-b from-[#101623] via-[#090D16] to-[#04060A] border border-gray-800 shadow-2xl transition-all`}
    >
      {/* ── Top badge ───────────────────────────────────────────────────── */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs text-gray-200 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          <span className="font-extrabold text-white">{label}</span>
          <span className="text-gray-400 hidden sm:inline">| Drag to Orbit 360°</span>
        </div>
      </div>

      {/* ── Controls ────────────────────────────────────────────────────── */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={handleResetView}
          className="p-2 rounded-xl bg-black/70 hover:bg-black/90 text-gray-200 hover:text-white border border-white/10 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          title="Reset Camera"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-xl bg-black/70 hover:bg-black/90 text-gray-200 hover:text-white border border-white/10 backdrop-blur-md text-xs font-semibold transition-all shadow-md"
          title={isFullscreen ? 'Exit Fullscreen' : 'Expand 3D View'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── Three.js Canvas ─────────────────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 5]} intensity={1.6} castShadow />
        <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#84CC16" />
        <pointLight position={[0, 4, 3]} intensity={0.8} />

        <Suspense fallback={<CanvasLoader />}>
          <Center>
            <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.25}>
              <ModelSelector
                modelType={modelType}
                color={color}
                playerNumber={playerNumber}
                playerName={playerName}
              />
            </Float>
          </Center>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={2.4}
          maxDistance={7.0}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 6}
          autoRotate={false}
        />
      </Canvas>

      {/* ── Hint ────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] text-gray-400/90 font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
        Scroll to Zoom &bull; Click &amp; Drag to Rotate
      </div>
    </div>
  );
}
