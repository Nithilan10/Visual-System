import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF, Line, Cone } from '@react-three/drei';
import PopupInfo from './PopupInfo';
import { TextureLoader } from 'three';
import { ArrowHelper, Vector3, Color } from 'three';

// Placeholder brain model loader
function BrainModel() {
  // Use a local GLB brain model from the public folder
  const { scene } = useGLTF('/brain.glb');
  return <primitive object={scene} scale={2.5} position={[0, -1, 0]} />;
}

// Hotspot for a brain structure
function Hotspot({ position, onClick }) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.13, 32, 32]} />
      <meshStandardMaterial color="#ff6f61" emissive="#ff6f61" emissiveIntensity={0.5} />
    </mesh>
  );
}

// Eye primitive with texture
function Eye({ position, onClick }) {
  const eyeTexture = useLoader(TextureLoader, '/eye_texture.jpg');
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.13, 32, 32]} />
      <meshStandardMaterial map={eyeTexture} />
    </mesh>
  );
}

// Optic nerve primitive with taper and angle
function OpticNerve({ start, end, onClick }) {
  const dir = [end[0] - start[0], end[1] - start[1], end[2] - start[2]];
  const length = Math.sqrt(dir[0]**2 + dir[1]**2 + dir[2]**2);
  const mid = [(start[0]+end[0])/2, (start[1]+end[1])/2, (start[2]+end[2])/2];
  const angleY = Math.atan2(dir[2], dir[0]);
  const angleZ = Math.atan2(dir[1], Math.sqrt(dir[0]**2 + dir[2]**2));
  return (
    <mesh position={mid} rotation={[0, -angleY, angleZ]} onClick={onClick}>
      <cylinderGeometry args={[0.07, 0.03, length, 32]} />
      <meshStandardMaterial color="#e57373" />
    </mesh>
  );
}

// Vision simulation overlay component
function VisionOverlay({ disease }) {
  if (!disease) return null;
  let overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 10,
    borderRadius: '16px',
    transition: 'opacity 0.3s',
  };
  switch (disease) {
    case 'Optic Neuritis':
      // Blur and desaturation
      return <div style={{...overlayStyle, backdropFilter: 'blur(6px) grayscale(0.7)', opacity: 0.95}} />;
    case 'Cataracts':
      // Strong blur and yellow tint
      return <div style={{...overlayStyle, backdropFilter: 'blur(12px)', background: 'rgba(255,255,200,0.25)', opacity: 0.95}} />;
    case 'Glaucoma':
      // Tunnel vision (vignette)
      return <div style={{...overlayStyle, background: 'radial-gradient(circle at center, transparent 60%, #222 100%)', opacity: 0.85}} />;
    case 'CVI':
      // Intermittent/patchy vision (simulate with semi-transparent patches)
      return <div style={{...overlayStyle, background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 20px, transparent 20px 40px)', opacity: 0.8}} />;
    case 'Visual Agnosia':
      // Overlay with question marks to indicate inability to recognize
      return (
        <div style={{
          ...overlayStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          color: '#2a4d69',
          opacity: 1,
          zIndex: 100,
          background: 'rgba(255,255,255,0.85)',
        }}>
          <span style={{background: 'rgba(255,255,255,1)', borderRadius: '1rem', padding: '1.5rem 3rem', boxShadow: '0 2px 12px rgba(44,62,80,0.12)'}}>???</span>
        </div>
      );
    default:
      return null;
  }
}

function PopupButton({ position, label, onClick }) {
  return (
    <Html position={position} style={{ pointerEvents: 'auto' }}>
      <button
        style={{
          background: '#2a4d69',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(44,62,80,0.12)',
        }}
        onClick={onClick}
        title={label}
      >
        i
      </button>
    </Html>
  );
}

function SimpleArrow({ from, to, color = '#2a4d69' }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      const dir = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
      const length = Math.sqrt(dir[0]**2 + dir[1]**2 + dir[2]**2);
      ref.current.setDirection(new Vector3(...dir).normalize());
      ref.current.setLength(length, 0.3, 0.18);
      ref.current.position.set(...from);
      ref.current.setColor(new Color(color));
    }
  });
  return <primitive object={new ArrowHelper(new Vector3(1,0,0), new Vector3(...from), 1, color)} ref={ref} />;
}

export default function BrainViewer({ selectedDisease, selectedStructure, selectedNeuro, selectedAnimal }) {
  // Popup state for each structure
  const [showOccipitalPopup, setShowOccipitalPopup] = React.useState(false); // Occipital cortex
  const [showOpticNervePopup, setShowOpticNervePopup] = React.useState(false); // Optic nerve (center)
  const [showVisualPathwayPopup, setShowVisualPathwayPopup] = React.useState(false); // Optic tract/LGN
  const [showLeftEyePopup, setShowLeftEyePopup] = React.useState(false);
  const [showRightEyePopup, setShowRightEyePopup] = React.useState(false);
  const [showLeftOpticNervePopup, setShowLeftOpticNervePopup] = React.useState(false);
  const [showRightOpticNervePopup, setShowRightOpticNervePopup] = React.useState(false);
  const [showOpticChiasmPopup, setShowOpticChiasmPopup] = React.useState(false);
  const [showLeftOpticTractPopup, setShowLeftOpticTractPopup] = React.useState(false);
  const [showRightOpticTractPopup, setShowRightOpticTractPopup] = React.useState(false);
  const [showLeftLGNPopup, setShowLeftLGNPopup] = React.useState(false);
  const [showRightLGNPopup, setShowRightLGNPopup] = React.useState(false);
  const [showLeftOpticRadiationPopup, setShowLeftOpticRadiationPopup] = React.useState(false);
  const [showRightOpticRadiationPopup, setShowRightOpticRadiationPopup] = React.useState(false);

  // Eye and nerve positions (refined to match anatomical images)
  // Brain is at [0, -1, 0] and scale 2.5
  // Eyes: more anterior, slightly inferior, and lateral
  const leftEyePos = [-0.45, -0.05, 2.7];
  const rightEyePos = [0.45, -0.05, 2.7];
  // Optic nerves: from each eye, angled medially and posteriorly toward the chiasm, slightly downward
  const leftNerveEnd = [-0.18, -0.18, 1.7];
  const rightNerveEnd = [0.18, -0.18, 1.7];
  // Optic chiasm: midline, just below the brain, slightly posterior to nerves
  const opticChiasmPos = [0, -0.25, 1.3];
  // Optic tracts: from chiasm, posterior and lateral, slightly inferior
  const leftOpticTractPos = [-0.45, -0.32, 0.6];
  const rightOpticTractPos = [0.45, -0.32, 0.6];
  // LGN: deep, lateral, and posterior to chiasm, slightly inferior
  const leftLGNPos = [-0.7, -0.35, 0.1];
  const rightLGNPos = [0.7, -0.35, 0.1];
  // Optic radiations: from LGN, arcing back and laterally, slightly upward
  const leftOpticRadiationPos = [-0.85, 0.05, -1.0];
  const rightOpticRadiationPos = [0.85, 0.05, -1.0];
  // Occipital cortex: posterior-inferior part of brain
  const occipitalCortexPos = [0, -0.2, -2.4];

  // Map keys to 3D positions
  const structurePositions = {
    leftEye: leftEyePos,
    rightEye: rightEyePos,
    leftOpticNerve: leftNerveEnd,
    rightOpticNerve: rightNerveEnd,
    opticChiasm: opticChiasmPos,
    leftOpticTract: leftOpticTractPos,
    rightOpticTract: rightOpticTractPos,
    leftLGN: leftLGNPos,
    rightLGN: rightLGNPos,
    leftOpticRadiation: leftOpticRadiationPos,
    rightOpticRadiation: rightOpticRadiationPos,
    occipitalCortex: occipitalCortexPos,
  };
  // Map neurotransmitters to regions (for demo, use occipital cortex for all)
  const neurotransmitterPositions = {
    glutamate: occipitalCortexPos,
    gaba: occipitalCortexPos,
    acetylcholine: occipitalCortexPos,
    dopamine: occipitalCortexPos,
  };
  // Map animals to regions (for demo, use left eye for salamander, others arbitrary)
  const animalPositions = {
    texasBlindSalamander: leftEyePos,
    starNosedMole: [0.7, 0.3, 0],
    bat: [0, 0.3, 1.2],
    caveScorpion: [-0.7, 0.3, 0],
    roundworm: [0, -0.5, 0],
  };
  // Determine which position to highlight/arrow
  let highlightPos = null;
  if (selectedStructure && structurePositions[selectedStructure]) highlightPos = structurePositions[selectedStructure];
  if (selectedNeuro && neurotransmitterPositions[selectedNeuro]) highlightPos = neurotransmitterPositions[selectedNeuro];
  if (selectedAnimal && animalPositions[selectedAnimal]) highlightPos = animalPositions[selectedAnimal];
  // Arrow start (left of model, y matches highlight)
  const arrowStart = [-2.2, highlightPos ? highlightPos[1] : 0.2, 0];

  return (
    <div style={{ width: '100%', height: '70vh', background: '#e9eff4', borderRadius: '16px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Suspense fallback={<Html center>Loading Brain...</Html>}>
          <BrainModel />
          {/* Eyes */}
          <Eye position={leftEyePos} />
          <Eye position={rightEyePos} />
          {/* Optic nerves */}
          <OpticNerve start={leftEyePos} end={leftNerveEnd} />
          <OpticNerve start={rightEyePos} end={rightNerveEnd} />
          {/* Highlight selected structure/region */}
          {highlightPos && (
            <mesh position={highlightPos}>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial color="#ff6f61" emissive="#ff6f61" emissiveIntensity={0.7} />
            </mesh>
          )}
          {/* Draw arrow from side panel to selected structure/region */}
          {highlightPos && <SimpleArrow from={arrowStart} to={highlightPos} color="#2a4d69" />}
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
      {/* Vision simulation overlay */}
      <VisionOverlay disease={selectedDisease} />
      {/* Popups for each structure */}
      {showOccipitalPopup && (
        <PopupInfo
          title="Occipital Cortex"
          description="The occipital cortex, located at the back of the brain, is the primary center for processing visual information. It receives input from the eyes via the optic nerves and is crucial for interpreting shapes, colors, and motion. Damage here can cause visual impairment even if the eyes are healthy."
          onClose={() => setShowOccipitalPopup(false)}
        />
      )}
      {showOpticNervePopup && (
        <PopupInfo
          title="Optic Nerve (Central)"
          description="The optic nerve carries visual information from the retina in each eye to the brain. It is essential for transmitting the electrical signals that allow us to see. Damage to the optic nerve can cause vision loss or blindness."
          onClose={() => setShowOpticNervePopup(false)}
        />
      )}
      {showVisualPathwayPopup && (
        <PopupInfo
          title="Visual Pathway (Optic Tract & LGN)"
          description="The visual pathway includes the optic tract and the lateral geniculate nucleus (LGN) in the thalamus. The LGN acts as a relay center, processing and organizing visual information before sending it to the occipital cortex. Disruption here can cause specific types of vision loss."
          onClose={() => setShowVisualPathwayPopup(false)}
        />
      )}
      {showLeftEyePopup && (
        <PopupInfo
          title="Left Eye"
          description="The left eye is responsible for capturing light from the left side of the visual field. Light passes through the cornea and lens, focusing an image onto the retina. Photoreceptors in the retina convert this light into electrical signals, which are sent to the brain via the left optic nerve."
          onClose={() => setShowLeftEyePopup(false)}
        />
      )}
      {showRightEyePopup && (
        <PopupInfo
          title="Right Eye"
          description="The right eye captures light from the right side of the visual field. Like the left eye, it focuses images onto the retina, where photoreceptors convert light into electrical signals. These signals travel to the brain through the right optic nerve."
          onClose={() => setShowRightEyePopup(false)}
        />
      )}
      {showLeftOpticNervePopup && (
        <PopupInfo
          title="Left Optic Nerve"
          description="The left optic nerve transmits electrical signals from the left eye's retina to the brain. It carries information about the right visual field. Damage to this nerve can cause vision loss in the left eye."
          onClose={() => setShowLeftOpticNervePopup(false)}
        />
      )}
      {showRightOpticNervePopup && (
        <PopupInfo
          title="Right Optic Nerve"
          description="The right optic nerve transmits electrical signals from the right eye's retina to the brain. It carries information about the left visual field. Damage to this nerve can cause vision loss in the right eye."
          onClose={() => setShowRightOpticNervePopup(false)}
        />
      )}
      {showOpticChiasmPopup && (
        <PopupInfo
          title="Optic Chiasm"
          description="The optic chiasm is the X-shaped structure where fibers from the nasal (inner) halves of both retinas cross to the opposite side of the brain. This crossing allows visual information from each eye to be processed by both hemispheres, which is crucial for depth perception and a unified visual field."
          onClose={() => setShowOpticChiasmPopup(false)}
        />
      )}
      {showLeftOpticTractPopup && (
        <PopupInfo
          title="Left Optic Tract"
          description="The left optic tract carries visual information from the right visual field of both eyes, after the optic chiasm, toward the left lateral geniculate nucleus (LGN) in the thalamus. It is a key part of the visual pathway."
          onClose={() => setShowLeftOpticTractPopup(false)}
        />
      )}
      {showRightOpticTractPopup && (
        <PopupInfo
          title="Right Optic Tract"
          description="The right optic tract carries visual information from the left visual field of both eyes, after the optic chiasm, toward the right lateral geniculate nucleus (LGN) in the thalamus. It is a key part of the visual pathway."
          onClose={() => setShowRightOpticTractPopup(false)}
        />
      )}
      {showLeftLGNPopup && (
        <PopupInfo
          title="Left Lateral Geniculate Nucleus (LGN)"
          description="The left LGN is a relay center in the thalamus that receives visual information from the left optic tract. It processes and organizes these signals before sending them to the left visual cortex in the occipital lobe."
          onClose={() => setShowLeftLGNPopup(false)}
        />
      )}
      {showRightLGNPopup && (
        <PopupInfo
          title="Right Lateral Geniculate Nucleus (LGN)"
          description="The right LGN is a relay center in the thalamus that receives visual information from the right optic tract. It processes and organizes these signals before sending them to the right visual cortex in the occipital lobe."
          onClose={() => setShowRightLGNPopup(false)}
        />
      )}
      {showLeftOpticRadiationPopup && (
        <PopupInfo
          title="Left Optic Radiation"
          description="The left optic radiation is a bundle of nerve fibers that carries visual information from the left LGN to the left occipital cortex. It is essential for conscious visual perception and the interpretation of visual stimuli."
          onClose={() => setShowLeftOpticRadiationPopup(false)}
        />
      )}
      {showRightOpticRadiationPopup && (
        <PopupInfo
          title="Right Optic Radiation"
          description="The right optic radiation is a bundle of nerve fibers that carries visual information from the right LGN to the right occipital cortex. It is essential for conscious visual perception and the interpretation of visual stimuli."
          onClose={() => setShowRightOpticRadiationPopup(false)}
        />
      )}
    </div>
  );
}

// Preload the model
useGLTF.preload('/brain.glb'); 