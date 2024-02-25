import { forwardRef, useEffect, useState } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useStore } from '../../../../../store'

export default forwardRef(function Case5Model(props, ref) {
  const store = useStore()
  const [activePage, setActivePage] = useState(true)

  const { camera } = useThree();

  useEffect(()=>{
    if (props.currentPage === `/portfolio/05`) {
      setTimeout(() => {
        setActivePage(true)
      }, 500);
    } else { setActivePage(false) }
  }, [props.currentPage])

  // Removed bug with fast changing pages and delay 500
  useEffect(()=>{
    if (props.currentPage === `/portfolio/05`){
      store.scroll = 0
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 9
      camera.lookAt(0,0,0)
  }
    if (props.currentPage != `/portfolio/05`){
        setActivePage(false)
    }
  },[activePage])

  const reev = useGLTF('/models/case5/RE-EV.glb')
  const sceneReev = useGLTF('/models/case5/sceneReev.glb')

  useEffect(() => {
    sceneReev.materials.RingLightMat.color.r = 0.2
    sceneReev.materials.RingLightMat.color.g = 0.2
    sceneReev.materials.RingLightMat.color.b = 0.2
    sceneReev.materials.RingLightMat.emissive.r = 0.7
    sceneReev.materials.RingLightMat.emissive.g = 0.1
    sceneReev.materials.RingLightMat.emissive.b = 1
    sceneReev.materials.RingLightMat.emissiveIntensity = 4.25
    sceneReev.materials.RingLightMat.toneMapped = false

    sceneReev.materials.WhiteLightMat.color.r = 0.7
    sceneReev.materials.WhiteLightMat.color.g = 0.4
    sceneReev.materials.WhiteLightMat.color.b = 0.3
    sceneReev.materials.WhiteLightMat.emissive.r = 0.6
    sceneReev.materials.WhiteLightMat.emissive.g = 0.0
    sceneReev.materials.WhiteLightMat.emissive.b = 0.2
    sceneReev.materials.WhiteLightMat.emissiveIntensity = 20
    sceneReev.materials.WhiteLightMat.toneMapped = false
  }, [])

  useFrame((renderer, delta) => {
    if (activePage === true) {
      // Transition in
      ref.current.visible = true

      // Object animation with cursor
      easing.damp3( ref.current.rotation, [renderer.pointer.y * 0.01, renderer.pointer.x * 0.2, 0 ], 1, delta )
      if(renderer.size.width <= 768) {
        easing.damp3( ref.current.scale, [0.8, 0.8, 0.8 ], 1, delta )
        easing.damp3( ref.current.position, [0, -0.5, 0 ], 1, delta )
      }
      if(renderer.size.width > 768) {
        easing.damp3( ref.current.position, [1.75, 0, 0 ], 1, delta )
        easing.damp3( ref.current.scale, [1, 1, 1 ], 1, delta )
      }
    } else {
      // Transition out
      easing.damp3( ref.current.scale, [0, 0, 0], 0.2, delta )
      if (ref.current.scale.x === 0) {
        ref.current.visible = false
      }
    }
  })

  return <>
    <group ref={ref} position={[1, 0, 0]}>
      <Float>
        <group position={[0, 0.025, 0]} rotation={[0, -0.4, 0]} scale={0.1}>
          <primitive object={reev.scene} />
        </group>
      </Float>
      <group position={[0, -1.25, 0]} rotation={[0.2, -0.5, 0]} scale={1.25}>
        <primitive object={sceneReev.scene} />
      </group>
    </group> 
  </>    
    
})