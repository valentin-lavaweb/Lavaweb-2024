import { useRef, useState, forwardRef, useEffect } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

import RoofModel from './RoofModel.jsx'
import LinesModel from './LinesModel.jsx'
import BackgroundScheme from './BackgroundScheme.jsx';
import { useStore } from '../../../../../store.jsx'

export default forwardRef(function Case2Model(props, ref) {
  const store = useStore()

  const { camera } = useThree();

  const [hovered, setHovered] = useState(true)

  const roofGroup = useRef()
  const linesModelRef = useRef()

  useFrame((renderer, delta) => {
      // CAMERA  
      easing.damp(renderer.camera.position, 'y', 0 - store.scroll * 35, 0.0, delta)

      // Transition in
      easing.damp3(ref.current.scale, [1, 1, 1], 1, delta)  

      // Animation model with cursor
      if (renderer.size.width <= 768) {
        easing.damp3(roofGroup.current.position, [0, Math.min(store.scroll * 40, 10), 0], 0.01, delta)
        easing.damp3(ref.current.rotation, [0.02, 0.1, 0], 1, delta)
        easing.damp3(ref.current.position, [0, -0.2, 0], 1, delta)
      }
      if(renderer.size.width > 768) {
        easing.damp3(roofGroup.current.position, [0, 0, 0], 0.01, delta)
        easing.damp3(ref.current.rotation, [renderer.pointer.y * 0.02, renderer.pointer.x * 0.2, 0], 1, delta)
        easing.damp3(ref.current.position, [1.25, 0, 0], 1, delta)
      }
  })

  return <>
    <group ref={ref} position={[1.25, 0, 0]}>

      <group ref={roofGroup} rotation={[0.4, 0.4, 0]}
        onPointerMove={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <RoofModel hovered={hovered} />
        <LinesModel ref={linesModelRef} hovered={hovered} />
      </group>

    </group>   
  </>
    
})