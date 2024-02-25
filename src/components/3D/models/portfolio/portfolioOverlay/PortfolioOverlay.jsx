import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {MeshTransmissionMaterial} from '@react-three/drei'
import { easing } from 'maath'
import { useStore } from '../../../../../store'
import { useControls } from 'leva'

export default function PortfolioOverlay(props) {
  const [colorState, setColorState] = useState(null)

  const store = useStore()
  const overlay = useRef()

  useEffect(() => {
    store.openedCase = false
    if (props.currentPage === '/portfolio') {
      setTimeout(() => { 
        setColorState("#001715") 
        overlay.current.material.roughness = 0.4
        overlay.current.material.thickness = 2.95
      }, 200);
    } 
    if (props.currentPage === '/portfolio/02') {
      setTimeout(() => { 
        setColorState("#1a1a1a") 
        overlay.current.material.roughness = 0.57
        overlay.current.material.thickness = 1.9
      }, 200);
    } 
    if (props.currentPage === '/portfolio/03') {
      setTimeout(() => { 
        setColorState("#000000") 
        overlay.current.material.roughness = 0.4
        overlay.current.material.thickness = 2.95
      }, 200);
    } 
    if (props.currentPage === '/portfolio/04') {
      setTimeout(() => { 
        setColorState("#240000") 
        overlay.current.material.roughness = 0.57
        overlay.current.material.thickness = 5
      }, 200);
    } 
    if (props.currentPage === '/portfolio/05') {
      setTimeout(() => { 
        setColorState("#220027") 
        overlay.current.material.roughness = 0.64
        overlay.current.material.thickness = 1.02
      }, 200);
    } 
  }, [props.currentPage])

  useEffect(() => {
    if (store.openedCase === true) {
      setTimeout(() => {
        overlay.current.material.visibility = true
      }, 200);
    } else {
      setTimeout(() => {
        overlay.current.material.visibility = false
      }, 200);
    }
  }, [store.portfolioOverlay])

  const config = {
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: 10,
    resolution: 1024,
    transmission: 1,
    roughness: 0.4,
    thickness: 2.95,
    ior: 1.1,
    chromaticAberration: 0.1,
    anisotropy: 0.0,
    distortion: 0.0,
    distortionScale: 0.0,
    temporalDistortion: 0,
    clearcoat: 0,
    // attenuationDistance: 10,
    reflectivity: 0.05,
    // attenuationColor: '#008c95',
    // color: '#ffffff',
    // bg: '#008c95',
    opacity: 1,
    envMapIntensity: 1
  }
  // const color = useControls('dsada', {
  //   color: 'white'
  // })
  const backgroundColor = new THREE.Color(colorState)
  // const backgroundColor = new THREE.Color(color.color)


  useFrame((renderer, delta) => {
    // overlay.current.position.x = renderer.camera.position.x
    // overlay.current.position.y = renderer.camera.position.y
    overlay.current.scale.x = 1
    overlay.current.scale.y = 1
    overlay.current.scale.z = 1

    // ChangePosition of overlay if camera goes down
    if (renderer.camera.position.y > -6) {
      overlay.current.position.z = renderer.camera.position.z - 1
      overlay.current.position.y = renderer.camera.position.y
    } else {
      overlay.current.position.z = renderer.camera.position.z - 50
    }

    // Change opacity if scrolled
    // if (store.scroll > 0.045) {
    //   easing.damp(overlay.current.material, 'opacity', store.openedCase ? 1 : Math.min(store.scroll * 10, 1), 0.5 , delta)
    // } else {
    //   easing.damp(overlay.current.material, 'opacity', store.openedCase ? 1 : 0, 0.5 , delta)
    // }
    if (store.scroll >= 0.01) {
      easing.damp(overlay.current.material, 'opacity', 1 , delta)
    } else {
      easing.damp(overlay.current.material, 'opacity', store.openedCase ? 1 : 0, 0.5 , delta)
    }
  })
  
  return <>
      <mesh ref={overlay} scale={1} rotation={[0, 0, 0]}>
          <planeGeometry args={[2, 2]}/>
          {/* <MeshTransmissionMaterial name="overlayMat" background={new THREE.Color('red')} {...config} transparent={true}/> */}
          <MeshTransmissionMaterial background={backgroundColor} {...config} transparent={true}/>
      </mesh>
  </>
}