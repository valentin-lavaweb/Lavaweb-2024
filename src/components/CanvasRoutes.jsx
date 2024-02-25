import * as THREE from 'three'
import { useEffect, useState, useRef } from 'react'
import Case1Model from './3D/models/portfolio/case1/Case1Model.jsx'
import EffectComposerComponent from './3D/effects/EffectComposerComponent.jsx'
import { useFrame, useThree } from '@react-three/fiber'
import BackgroundLavaComponent from './3D/background/BackgroundLavaComponent.jsx'
import { RenderTexture } from '@react-three/drei'

export default function CanvasRoutes(props) {
  const {viewport} = useThree()
  const case1ModelRef = useRef()





  // THREE.Vector2.prototype.equals = function (v, epsilon = 0.001) {
  //   return Math.abs(v.x - this.x) < epsilon && Math.abs(v.y - this.y) < epsilon
  // }
  
  // function useLerpedMouse() {
  //   const mouse = useThree((state) => state.mouse)
  //   const lerped = useRef(mouse.clone())
  //   const previous = new THREE.Vector2()
  //   useFrame((state) => {
  //     previous.copy(lerped.current)
  //     lerped.current.lerp(mouse, 0.1)
  //     // Regress system when the mouse is moved
  //     if (!previous.equals(lerped.current)) state.performance.regress()
  //   })
  //   return lerped
  // }
  // const mouse = useLerpedMouse()


  useFrame((renderer, delta) => {
  });

  return <>
  {/* <mesh>
    <planeGeometry args={[viewport.width, viewport.height]}/>
    <meshBasicMaterial toneMapped={false}>
      <RenderTexture attach="map">
        <BackgroundLavaComponent />
        <Case1Model ref={case1ModelRef} />
      </RenderTexture>
    </meshBasicMaterial>
  </mesh> */}
  <BackgroundLavaComponent />
  {/* <EffectComposerComponent /> */}
  </>
}