import { useGLTF } from '@react-three/drei'
import { useRef, forwardRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useStore } from '../../../../store'

export default forwardRef(function ContactsPageModel(props, ref) {
  const store = useStore()
  const [activePage, setActivePage] = useState(true)
  const { camera } = useThree();
  useEffect(()=>{
    if (props.currentPage === `/contacts`) {
      setTimeout(() => { 
        setActivePage(true) 
      }, 500);
    } else { setActivePage(false) }
  }, [props.currentPage])
  // Removed bug with fast changing pages and delay 500
  useEffect(()=>{
    if (props.currentPage === `/contacts`){
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 9
      store.scroll = 0
      camera.lookAt(0,0,0)
    }
    if (props.currentPage != `/contacts`){
        setActivePage(false)
    }
  },[activePage])

  const sphereRef = useRef()
  const earthModel = useGLTF('/models/contactsModel/earth2.glb')

  useFrame((renderer, delta) => {
    if (activePage === true) {
      // Transition in
      ref.current.visible = true
      easing.damp3(ref.current.scale, [1, 1, 1], 1, delta)
      sphereRef.current.rotation.y += delta * 0.1
      if(renderer.size.width > 768) {
        easing.damp3(ref.current.position, [0, 0.5, 0], 1, delta)
      } else {
        easing.damp3(ref.current.position, [0, 0.5, 0], 1, delta)
      }
    } else {
      // Transition out
      easing.damp3(ref.current.scale, [0, 0, 0], 0.3, delta)
      if (ref.current.scale.x === 0) {
        ref.current.visible = false
      }
    }
  })

  return <>
 
    <group ref={ref} position={[0, 0.5, 0]} rotation={[0, 0, 0]} dispose={null}>
        <mesh ref={sphereRef} {...earthModel.nodes.Sphere} scale={1.9}>
          <meshStandardMaterial {...earthModel.materials.sphereMat} toneMapped={false} emissiveIntensity={7} transparent={true}/>
        </mesh>
    </group>
  
  </>
})