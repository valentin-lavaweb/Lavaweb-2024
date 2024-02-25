import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import CanvasRoutes from './CanvasRoutes.jsx';
import { Suspense, useEffect, useRef, useState } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import BottomLoadComponent from './HTML/bottomLoadComponent/BottomLoadComponent.jsx';
import MainScene from './3D/MainScene.jsx';

export default function App(props) {
  const [dpr, setDpr] = useState(1)
  const canvasRef = useRef()
  const backgroundTexture = new THREE.TextureLoader().load('/backgrounds/vignette1.png')

  useEffect(() => {
    // alert(window.devicePixelRatio)
    // alert(dpr)
  }, [dpr])
  
  return <>
    <Canvas
      ref={canvasRef}
      eventPrefix={"client"}
      eventSource={document.querySelector('#root')}
      camera={{ fov: 40, position: [0, 0, 9], near: 0.1, far: 150 }}
      dpr={dpr}
    >
      <PerformanceMonitor onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))} onDecline={() => setDpr(1)} />
      {/* <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(Math.min(Math.max(0.5 * factor, 2), 0.9))} /> */}
      <Suspense fallback={null}>
        {/* <CanvasRoutes
        location={props.location}
        rendered={props.rendered} setRendered={props.setRendered}
        activePage={props.activePage} setActivePage={props.setActivePage}
        /> */}
        <MainScene />
      </Suspense>
    </Canvas>
    <BottomLoadComponent />
  </>
}