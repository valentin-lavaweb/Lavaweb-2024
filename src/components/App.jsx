import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import CanvasRoutes from './CanvasRoutes.jsx';
import { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, PerformanceMonitor } from '@react-three/drei';
import BottomLoadComponent from './HTML/bottomLoadComponent/BottomLoadComponent.jsx';
import MainScene from './3D/MainScene.jsx';
import { useGesture } from '@use-gesture/react';
import { Lethargy } from 'lethargy'
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export default function App(props) {
  const [dpr, setDpr] = useState(1)
  const canvasRef = useRef()
  const backgroundTexture = new THREE.TextureLoader().load('/backgrounds/vignette1.png')

  useEffect(() => {
    // alert(window.devicePixelRatio)
    // alert(dpr)
  }, [dpr])
  const lethargy = new Lethargy()
  const deltaY = useRef(0)
  const scroll = useRef(0)
  const transitionShader = useRef()


  const bind = useGesture({
    onWheel: (state) => {
      // console.log(state);
      // console.log(lethargy.check(state.event))
      // console.log(state)
    },
  });

  useEffect(() => {
    console.log(transitionShader.current)
  }, [])
  
  return <>
    <Canvas
      ref={canvasRef}
      scene={null}
      // eventPrefix={"client"}
      // eventSource={document.querySelector('#root')}
      camera={{ fov: 40, position: [0, 0, 3], near: 0.1, far: 150 }}
      dpr={dpr}
      {...bind()}
      onWheel={(e) => {
        deltaY.current += (e.deltaY / 3000) % 4
        scroll.current += e.deltaY / 1000 % 4
        console.log(scroll.current)
        // console.log(deltaY.current % 1)
      }}
      
    >
      {/* <PerformanceMonitor onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))} onDecline={() => setDpr(1)} /> */}
      {/* <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(Math.min(Math.max(0.5 * factor, 2), 0.9))} /> */}
      <Suspense fallback={null}>
        <MainScene ref={transitionShader} deltaY={deltaY}/>
        {/* <CanvasRoutes
        location={props.location}
        rendered={props.rendered} setRendered={props.setRendered}
        activePage={props.activePage} setActivePage={props.setActivePage}
        /> */}
      </Suspense>
    </Canvas>
    <BottomLoadComponent />
  </>
}