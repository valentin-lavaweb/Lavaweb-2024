import {useAnimations, useGLTF} from '@react-three/drei'
import { useEffect, useRef, forwardRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useStore } from '../../../../store'

export default forwardRef(function AboutPageModel(props, ref) {
  const store = useStore()
  const [activePage, setActivePage] = useState(true)
  const { camera } = useThree();
  useEffect(()=>{
    if (props.currentPage.split('/')[1] === `about`) {
      setTimeout(() => { 
        setActivePage(true) 
      }, 500);
    } else { setActivePage(false) }
  }, [props.currentPage])

  // Removed bug with fast changing pages and delay 500
  useEffect(()=>{
    if (props.currentPage.split(`/`)[1] == `about`){
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 9
      store.scroll = 0
      camera.lookAt(0,0,0)
    }
    if (props.currentPage.split(`/`)[1] != `about`){
        setActivePage(false)
    }
  },[activePage])

  const modelRef = useRef()
  
  const PrimaryIonDrive = useGLTF('/models/aboutModel/PrimaryIonDrive.glb')
  const animations = useAnimations(PrimaryIonDrive.animations, PrimaryIonDrive.scene)

  useEffect(() => {
    animations.actions.Main.play()
    if(PrimaryIonDrive) {
      PrimaryIonDrive.materials.HoloFillDark.toneMapped = true
      PrimaryIonDrive.materials.constant1.toneMapped = false
      PrimaryIonDrive.materials.constant2.toneMapped = false
    
      PrimaryIonDrive.materials.constant1.emissiveIntensity = 1
      PrimaryIonDrive.materials.constant1.color.r = 0
      PrimaryIonDrive.materials.constant1.color.g = 0.5
      PrimaryIonDrive.materials.constant1.color.b = 5
      PrimaryIonDrive.materials.constant1.emissive.r = 0
      PrimaryIonDrive.materials.constant1.emissive.g = 0.5
      PrimaryIonDrive.materials.constant1.emissive.b = 5
    
      PrimaryIonDrive.materials.constant2.emissiveIntensity = 1
      PrimaryIonDrive.materials.constant2.color.r = 0
      PrimaryIonDrive.materials.constant2.color.g = 0.5
      PrimaryIonDrive.materials.constant2.color.b = 5
      PrimaryIonDrive.materials.constant2.emissive.r = 0
      PrimaryIonDrive.materials.constant2.emissive.g = 0.5
      PrimaryIonDrive.materials.constant2.emissive.b = 5
    }
  }, [])

  useFrame((renderer, delta) => {
    if (activePage === true) {
      // Transition IN
      ref.current.visible = true
      easing.damp3(ref.current.scale, [1.2, 1.2, 1.2], 1, delta)

      // Animation
      // console.log(((window.innerWidth - minW) / (maxW - minW)) * (maxP - minP) + minP)
      // console.log(((window.innerWidth - 1280) / (1680 - 1280)) * (3.2 - 2.2) + 2.2)
      easing.damp3(modelRef.current.rotation, [Math.PI * 2, 0, 0 ], 2, delta)
      if (renderer.size.width <= 768) {
        easing.damp3(ref.current.position, [0, 0.15, 0], 1, delta)
      }
      if(renderer.size.width > 768 && renderer.size.width <= 980) {
        easing.damp3(ref.current.position, [1, 0.15, 0], 1, delta)
      }
      if(renderer.size.width > 980 && renderer.size.width <= 1280) {
        easing.damp3(ref.current.position, [((window.innerWidth - 980) / (1280 - 980)) * (2.2 - 1.7) + 1.7, 0.15, 0], 1, delta)
      }
      if(renderer.size.width > 1280 && renderer.size.width <= 1680) {
        easing.damp3(ref.current.position, [((window.innerWidth - 1280) / (1680 - 1280)) * (3.0 - 2.2) + 2.2, 0.15, 0], 1, delta)
      }
      if(renderer.size.width > 1680) {
        easing.damp3(ref.current.position, [3.2, 0.15, 0], 1, delta)
      }
    } else {
      // Transition OUT
      easing.damp3(ref.current.scale, [0, 0, 0], 0.3, delta)
      if (ref.current.scale.x === 0){
        ref.current.visible = false
        modelRef.current.rotation.x = -0.45
        modelRef.current.rotation.y = 0
        modelRef.current.rotation.z = 1.3
      }
    }
  })

  return <>
  <group ref={ref} position={[3.2, 0.15, 0 ]} rotation={[-0.45, 0, 1.3 ]} dispose={null}>
    <primitive ref={modelRef} object={PrimaryIonDrive.scene} rotation={[0, 0, 0 ]} />
  </group>  
  </>
})

