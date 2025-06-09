import React, { useState } from 'react';
import './App.css';
import BrainViewer from './components/BrainViewer';
// Placeholder for 3D viewer component
// import BrainViewer from './components/BrainViewer';

const visualStructures = [
  { key: 'leftEye', label: 'Left Eye' },
  { key: 'rightEye', label: 'Right Eye' },
  { key: 'leftOpticNerve', label: 'Left Optic Nerve' },
  { key: 'rightOpticNerve', label: 'Right Optic Nerve' },
  { key: 'opticChiasm', label: 'Optic Chiasm' },
  { key: 'leftOpticTract', label: 'Left Optic Tract' },
  { key: 'rightOpticTract', label: 'Right Optic Tract' },
  { key: 'leftLGN', label: 'Left LGN' },
  { key: 'rightLGN', label: 'Right LGN' },
  { key: 'leftOpticRadiation', label: 'Left Optic Radiation' },
  { key: 'rightOpticRadiation', label: 'Right Optic Radiation' },
  { key: 'occipitalCortex', label: 'Occipital Cortex' },
];

const neurotransmitters = [
  { key: 'glutamate', label: 'Glutamate' },
  { key: 'gaba', label: 'GABA' },
  { key: 'acetylcholine', label: 'Acetylcholine' },
  { key: 'dopamine', label: 'Dopamine' },
];

const animals = [
  { key: 'texasBlindSalamander', label: 'Texas Blind Salamander' },
  { key: 'starNosedMole', label: 'Star-nosed Mole' },
  { key: 'bat', label: 'Bat' },
  { key: 'caveScorpion', label: 'Cave Scorpion' },
  { key: 'roundworm', label: 'Roundworm' },
];

function App() {
  const [selectedPanel, setSelectedPanel] = useState('info');
  const [selectedStructure, setSelectedStructure] = useState('');
  const [selectedNeuro, setSelectedNeuro] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');

  const diseaseList = [
    'Optic Neuritis',
    'CVI',
    'Visual Agnosia',
    'Cataracts',
    'Glaucoma',
  ];

  // Info for each structure, neurotransmitter, and animal
  const infoMap = {
    leftEye: {
      title: "Left Eye",
      description: "The left eye is a sensory organ that captures light from the left side of the visual field. Its main function is to focus light onto the retina, where photoreceptors convert it into electrical signals. These signals represent visual information and are relayed through the left optic nerve to the brain. The left eye works together with the right eye to provide depth perception and a wide field of view, integrating visual input for binocular vision."
    },
    rightEye: {
      title: "Right Eye",
      description: "The right eye captures light from the right side of the visual field. Like the left eye, it focuses images onto the retina, where photoreceptors convert light into electrical signals. These signals are relayed through the right optic nerve to the brain. The right eye complements the left eye, allowing for stereoscopic vision and accurate spatial perception."
    },
    leftOpticNerve: {
      title: "Left Optic Nerve",
      description: "The left optic nerve is a bundle of nerve fibers that transmits electrical signals from the left eye's retina to the brain. It carries information about the right visual field. The optic nerve is essential for relaying visual information from the eye to the central nervous system, where it is further processed for perception."
    },
    rightOpticNerve: {
      title: "Right Optic Nerve",
      description: "The right optic nerve transmits electrical signals from the right eye's retina to the brain, carrying information about the left visual field. It is a critical connection in the visual pathway, ensuring that visual signals reach the brain for interpretation."
    },
    opticChiasm: {
      title: "Optic Chiasm",
      description: "The optic chiasm is an X-shaped structure where fibers from the nasal (inner) halves of both retinas cross to the opposite side of the brain. This crossing allows visual information from each eye to be processed by both hemispheres, which is crucial for depth perception and a unified visual field. The optic chiasm integrates and redistributes visual signals, ensuring that each hemisphere receives information from both eyes."
    },
    leftOpticTract: {
      title: "Left Optic Tract",
      description: "The left optic tract carries visual information from the right visual field of both eyes, after the optic chiasm, toward the left lateral geniculate nucleus (LGN) in the thalamus. It is a key part of the visual pathway, relaying processed visual signals for further integration and interpretation."
    },
    rightOpticTract: {
      title: "Right Optic Tract",
      description: "The right optic tract carries visual information from the left visual field of both eyes, after the optic chiasm, toward the right lateral geniculate nucleus (LGN) in the thalamus. It ensures that visual signals are properly routed for processing in the correct hemisphere."
    },
    leftLGN: {
      title: "Left Lateral Geniculate Nucleus (LGN)",
      description: "The left LGN is a relay center in the thalamus that receives visual information from the left optic tract. It processes, organizes, and refines these signals before sending them to the left visual cortex in the occipital lobe. The LGN is crucial for filtering and modulating visual input, contributing to attention and perception."
    },
    rightLGN: {
      title: "Right Lateral Geniculate Nucleus (LGN)",
      description: "The right LGN is a relay center in the thalamus that receives visual information from the right optic tract. It organizes and processes these signals before relaying them to the right visual cortex in the occipital lobe, playing a key role in visual attention and integration."
    },
    leftOpticRadiation: {
      title: "Left Optic Radiation",
      description: "The left optic radiation is a bundle of nerve fibers that carries visual information from the left LGN to the left occipital cortex. It is essential for conscious visual perception and the interpretation of visual stimuli, ensuring that processed signals reach the primary visual cortex for further analysis."
    },
    rightOpticRadiation: {
      title: "Right Optic Radiation",
      description: "The right optic radiation is a bundle of nerve fibers that carries visual information from the right LGN to the right occipital cortex. It enables the transfer of processed visual signals to the primary visual cortex, supporting conscious vision and interpretation."
    },
    occipitalCortex: {
      title: "Occipital Cortex",
      description: "The occipital cortex, located at the back of the brain, is the primary center for processing visual information. It receives input from the eyes via the optic nerves and is crucial for interpreting shapes, colors, and motion. The occipital cortex integrates visual signals with other sensory information, allowing for perception, recognition, and spatial awareness."
    },
    // Neurotransmitters
    glutamate: {
      title: "Glutamate",
      description: "Glutamate is the main excitatory neurotransmitter in the visual system. It is released by photoreceptors, bipolar cells, and ganglion cells in the retina, and is essential for transmitting visual signals to the brain. Glutamate enables rapid communication between neurons, supporting the relay and processing of visual information throughout the visual pathway."
    },
    gaba: {
      title: "GABA",
      description: "GABA (gamma-aminobutyric acid) is the main inhibitory neurotransmitter in the visual system. It helps modulate and refine visual signals, especially in the retina and visual cortex, by inhibiting excessive neuronal activity. GABA ensures that visual information is precise and prevents overstimulation, contributing to clear perception."
    },
    acetylcholine: {
      title: "Acetylcholine",
      description: "Acetylcholine is involved in modulating attention and visual processing, especially in the retina and visual cortex. It enhances the signal-to-noise ratio, improves contrast sensitivity, and supports the integration of visual information with attention and memory."
    },
    dopamine: {
      title: "Dopamine",
      description: "Dopamine modulates retinal processing and light adaptation. It adjusts the sensitivity of the retina to different lighting conditions and influences the integration of visual signals with motivation and reward pathways in the brain."
    },
    // Animals
    texasBlindSalamander: {
      title: "Texas Blind Salamander",
      description: "This cave-dwelling salamander has underdeveloped eyes covered by skin. It relies on pressure and chemical cues in the water to detect prey. Its brain prioritizes these senses over sight, demonstrating how the nervous system can adapt to environments where vision is not useful."
    },
    starNosedMole: {
      title: "Star-nosed Mole",
      description: "Nearly blind, this mole has a nose packed with thousands of touch receptors. Its brain is highly specialized for processing tactile information, showing how the somatosensory system can become dominant when vision is reduced."
    },
    bat: {
      title: "Bat",
      description: "Bats use echolocation instead of vision. Their brains are specialized for interpreting sound as spatial information, illustrating how the auditory system can compensate for limited vision."
    },
    caveScorpion: {
      title: "Cave Scorpion",
      description: "With very poor eyesight, cave scorpions hunt in darkness by detecting ground vibrations and using special organs to sense their environment. Their nervous systems are tuned for touch and chemical signals, not light."
    },
    roundworm: {
      title: "Roundworm",
      description: "Roundworms have no eyes. They use light-sensitive cells and chemical receptors to move toward or away from stimuli. Their nervous systems are simple but efficient, showing how life can adapt to environments without vision."
    },
  };

  // Map structure keys to image filenames
  const structureImages = {
    leftEye: '/eye.svg',
    rightEye: '/eye.svg',
    leftOpticNerve: '/optic_nerve.svg',
    rightOpticNerve: '/optic_nerve.svg',
    opticChiasm: '/optic_chiasm.svg',
    leftOpticTract: '/optic_tract.svg',
    rightOpticTract: '/optic_tract.svg',
    leftLGN: '/lgn.svg',
    rightLGN: '/lgn.svg',
    leftOpticRadiation: '/optic_radiation.svg',
    rightOpticRadiation: '/optic_radiation.svg',
    occipitalCortex: '/occipital_cortex.svg',
  };

  // Map animal keys to SVG images
  const animalImages = {
    texasBlindSalamander: '/texas_blind_salamander.svg',
    starNosedMole: '/star_nosed_mole.svg',
    bat: '/bat.svg',
    caveScorpion: '/cave_scorpion.svg',
    roundworm: '/roundworm.svg',
  };

  const explanationsJSX = (
    <div style={{ background: '#fff', borderRadius: 12, padding: '2rem 2.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontSize: '1.13rem', lineHeight: 1.7, width: '100%', maxWidth: 900, margin: '2rem auto' }}>
      <h2 style={{marginTop: 0}}>How the Visual System Connects & Integrates in the Brain</h2>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Eyes (Left & Right)</h3>
        <ul>
          <li><b>Function:</b> Capture light and focus it onto the retina.</li>
          <li><b>Role:</b> Provide the initial input for the visual system, enabling depth perception and a wide field of view.</li>
          <li><b>Integration:</b> Work together for binocular vision and spatial awareness.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Optic Nerves</h3>
        <ul>
          <li><b>Function:</b> Carry electrical signals (visual information) from each retina to the brain.</li>
          <li><b>Role:</b> Transmit information from the eyes to the central nervous system.</li>
          <li><b>Integration:</b> Each nerve contains data about both the left and right visual fields.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Optic Chiasm</h3>
        <ul>
          <li><b>Function:</b> The crossing point for fibers from the nasal halves of both retinas.</li>
          <li><b>Role:</b> Ensures that visual information from the right visual field of both eyes is processed in the left hemisphere, and vice versa.</li>
          <li><b>Integration:</b> Supports binocular vision and depth perception by redistributing visual signals.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Optic Tracts</h3>
        <ul>
          <li><b>Function:</b> Carry reorganized visual information from the chiasm to the thalamus.</li>
          <li><b>Role:</b> Each tract contains fibers from both eyes, but only for one visual field (left or right).</li>
          <li><b>Integration:</b> Relay processed signals for further integration and interpretation.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Lateral Geniculate Nucleus (LGN)</h3>
        <ul>
          <li><b>Function:</b> Acts as a relay and processing center in the thalamus.</li>
          <li><b>Role:</b> Organizes, filters, and refines visual signals before sending them to the visual cortex.</li>
          <li><b>Integration:</b> Contributes to attention, perception, and modulation of visual input.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Optic Radiations</h3>
        <ul>
          <li><b>Function:</b> Transmit processed visual information from the LGN to the occipital cortex.</li>
          <li><b>Role:</b> Ensure that signals reach the correct region of the visual cortex for interpretation.</li>
          <li><b>Integration:</b> Support conscious visual perception and analysis.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Occipital Cortex</h3>
        <ul>
          <li><b>Function:</b> The primary visual processing center of the brain.</li>
          <li><b>Role:</b> Interprets shapes, colors, motion, and spatial relationships.</li>
          <li><b>Integration:</b> Integrates visual input with other sensory information for perception and recognition.</li>
        </ul>
      </section>
      <section style={{marginBottom: '1.5rem'}}>
        <h3>Integration & Adaptation</h3>
        <ul>
          <li><b>Integration:</b> The visual system is deeply integrated with other brain regions, including those for attention, memory, and motor control.</li>
          <li><b>Neurotransmitters:</b> Glutamate, GABA, acetylcholine, and dopamine modulate the flow and processing of visual information at every stage.</li>
          <li><b>Adaptation:</b> In animals with reduced or no vision, other sensory systems (touch, hearing, chemical detection) become more prominent, and their brains adapt to prioritize these senses.</li>
        </ul>
      </section>
      <section>
        <h3>Summary</h3>
        <ul>
          <li>Each component of the visual system plays a specific role in capturing, relaying, processing, and interpreting visual information.</li>
          <li>The system's organization ensures efficient, accurate perception and allows for adaptation when vision is impaired or absent.</li>
        </ul>
      </section>
    </div>
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>3D Visual System & Occipital Cortex Explorer</h1>
      </header>
      <div className="main-content">
        <aside className="side-panel">
          <button onClick={() => setSelectedPanel('info')}>Educational Info</button>
          <button onClick={() => setSelectedPanel('disease')}>Disease Simulation</button>
          <button onClick={() => setSelectedPanel('animal')}>Animal Adaptations</button>
          <button onClick={() => setSelectedPanel('nt')}>Neurotransmitters</button>
          <button onClick={() => setSelectedPanel('explanations')}>Explanations</button>
        </aside>
        <main className="viewer-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
          {selectedPanel === 'explanations' ? (
            explanationsJSX
          ) : (
            <div style={{ width: '100%' }}>
              <div className="panel-content">
                {selectedPanel === 'info' && (
                  <div>
                    <b>Visual System Structures</b>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {visualStructures.map(s => (
                        <li key={s.key}>
                          <button style={{ width: '100%', textAlign: 'left', margin: '0.2rem 0', borderRadius: 6, padding: '0.4rem 0.7rem', background: selectedStructure === s.key ? '#2a4d69' : '#e9eff4', color: selectedStructure === s.key ? '#fff' : '#2a4d69', border: 'none', cursor: 'pointer' }}
                            onClick={() => setSelectedStructure(s.key)}>{s.label}</button>
                        </li>
                      ))}
                    </ul>
                    {selectedStructure && (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 0, margin: 0, position: 'relative' }}>
                        <img src={structureImages[selectedStructure]} alt={infoMap[selectedStructure].title} style={{ width: 'min(600px, 90vw)', height: 'auto', maxHeight: '50vh', objectFit: 'contain', margin: '2rem 0 1.5rem 0', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                        {/* Visual Agnosia overlay: show question marks if selectedDisease is Visual Agnosia */}
                        {selectedPanel === 'info' && selectedDisease === 'Visual Agnosia' && (
                          <div style={{ position: 'absolute', top: '2rem', left: 0, width: '100%', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
                            <span style={{ fontSize: '5rem', color: '#2a4d69', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', borderRadius: '1rem', padding: '1rem 2.5rem', boxShadow: '0 2px 12px rgba(44,62,80,0.12)' }}>???</span>
                          </div>
                        )}
                        <div style={{ maxWidth: 800, width: '90%', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.7, textAlign: 'left' }}>
                          <b style={{ fontSize: '1.5rem', display: 'block', marginBottom: '1rem', textAlign: 'center' }}>{infoMap[selectedStructure].title}</b>
                          {infoMap[selectedStructure].description}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {selectedPanel === 'disease' && (
                  <div>
                    <label htmlFor="disease-select"><b>Select a disease to simulate:</b></label>
                    <select
                      id="disease-select"
                      value={selectedDisease}
                      onChange={e => setSelectedDisease(e.target.value)}
                      style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', borderRadius: '6px' }}
                    >
                      <option value="">-- Choose Disease --</option>
                      {diseaseList.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {selectedDisease && (
                      <div style={{marginTop: '1rem', fontSize: '0.98rem'}}>
                        <b>Simulating:</b> {selectedDisease}
                      </div>
                    )}
                  </div>
                )}
                {selectedPanel === 'animal' && (
                  <div>
                    <b>Animal Adaptations</b>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {animals.map(a => (
                        <li key={a.key}>
                          <button style={{ width: '100%', textAlign: 'left', margin: '0.2rem 0', borderRadius: 6, padding: '0.4rem 0.7rem', background: selectedAnimal === a.key ? '#2a4d69' : '#e9eff4', color: selectedAnimal === a.key ? '#fff' : '#2a4d69', border: 'none', cursor: 'pointer' }}
                            onClick={() => setSelectedAnimal(a.key)}>{a.label}</button>
                        </li>
                      ))}
                    </ul>
                    {selectedAnimal && (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 0, margin: 0, position: 'relative' }}>
                        <img src={animalImages[selectedAnimal]} alt={infoMap[selectedAnimal].title} style={{ width: 'min(600px, 90vw)', height: 'auto', maxHeight: '50vh', objectFit: 'contain', margin: '2rem 0 1.5rem 0', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                        {/* Visual Agnosia overlay for animals */}
                        {selectedPanel === 'animal' && selectedDisease === 'Visual Agnosia' && (
                          <div style={{ position: 'absolute', top: '2rem', left: 0, width: '100%', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
                            <span style={{ fontSize: '5rem', color: '#2a4d69', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', borderRadius: '1rem', padding: '1rem 2.5rem', boxShadow: '0 2px 12px rgba(44,62,80,0.12)' }}>???</span>
                          </div>
                        )}
                        <div style={{ maxWidth: 800, width: '90%', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.7, textAlign: 'left' }}>
                          <b style={{ fontSize: '1.5rem', display: 'block', marginBottom: '1rem', textAlign: 'center' }}>{infoMap[selectedAnimal].title}</b>
                          {infoMap[selectedAnimal].description}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {selectedPanel === 'nt' && (
                  <div>
                    <b>Neurotransmitters in the Visual System</b>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {neurotransmitters.map(n => (
                        <li key={n.key}>
                          <button style={{ width: '100%', textAlign: 'left', margin: '0.2rem 0', borderRadius: 6, padding: '0.4rem 0.7rem', background: selectedNeuro === n.key ? '#2a4d69' : '#e9eff4', color: selectedNeuro === n.key ? '#fff' : '#2a4d69', border: 'none', cursor: 'pointer' }}
                            onClick={() => setSelectedNeuro(n.key)}>{n.label}</button>
                        </li>
                      ))}
                    </ul>
                    {selectedNeuro && (
                      <div style={{ marginTop: '1rem', background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <b>{infoMap[selectedNeuro].title}</b>
                        <div style={{ marginTop: '0.5rem' }}>{infoMap[selectedNeuro].description}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Only show 3D model if no structure is selected */}
              {selectedPanel === 'info' && !selectedStructure && (
                <BrainViewer
                  selectedDisease={''}
                  selectedStructure={''}
                  selectedNeuro={''}
                  selectedAnimal={''}
                />
              )}
              {/* 3D model for other panels as before */}
              {selectedPanel !== 'info' && (
                <BrainViewer
                  selectedDisease={selectedPanel === 'disease' ? selectedDisease : ''}
                  selectedStructure={selectedPanel === 'info' ? selectedStructure : ''}
                  selectedNeuro={selectedPanel === 'nt' ? selectedNeuro : ''}
                  selectedAnimal={selectedPanel === 'animal' ? selectedAnimal : ''}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
