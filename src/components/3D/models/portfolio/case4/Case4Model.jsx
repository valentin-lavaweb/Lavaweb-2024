
import * as THREE from 'three'
import { useRef, forwardRef, useState, useEffect } from 'react'
import { Float, useFBX } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import ShoeModel from './ShoeModel.jsx'
import { easing } from 'maath'
import { useStore } from '../../../../../store.jsx'

export default forwardRef(function Case4Model(props, ref) {
  const store = useStore()
  const [activePage, setActivePage] = useState(true)

  const { camera } = useThree();

  useEffect(()=>{
    if (props.currentPage === `/portfolio/04`) {
      setTimeout(() => {
        setActivePage(true)
      }, 500);
    } else { setActivePage(false) }
  }, [props.currentPage])

    // Removed bug with fast changing pages and delay 500
    useEffect(()=>{
      if (props.currentPage === `/portfolio/04`){
        store.scroll = 0
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 9
        camera.lookAt(0,0,0)
    }
      if (props.currentPage != `/portfolio/04`){
          setActivePage(false)
      }
    },[activePage])

  const boxRef = useRef()
  const donutTopRef = useRef()
  const donutBotRef = useRef()
  const coneRef = useRef()
  const capsuleRef = useRef()
  const sphereRef = useRef()
  const locationModelRef = useRef()


  const locationModel = useFBX('/models/case4/locationIconModel.fbx')
  useEffect(() => {
    locationModel.scale.x = 0.005
    locationModel.scale.y = 0.005
    locationModel.scale.z = 0.005
    locationModel.children[0].material[0].color.r = 2
    locationModel.children[0].material[0].color.g = 0.30
    locationModel.children[0].material[0].color.b = 0
  }, [])

  const standardMaterial = new THREE.MeshStandardMaterial()
  const torusGeometry = new THREE.TorusGeometry()

  useFrame((renderer, delta) => {
    if (activePage === true) {
      // CAMERA  
      // easing.damp(renderer.camera.position, 'y', 0 - store.scroll * 35, 0.0, delta)
      
      // Transition in
      ref.current.visible = true

      // Object Animations with cursor
      boxRef.current.rotation.x += delta * 0.15
      donutTopRef.current.rotation.x += delta * 0.15
      coneRef.current.rotation.z += delta * 0.15
      coneRef.current.rotation.x += delta * 0.05
      sphereRef.current.rotation.y += delta * 0.05
      easing.damp3(ref.current.rotation, [renderer.pointer.y * 0.05, Math.PI + renderer.pointer.x * 0.2, 0], 1, delta)
      if(renderer.size.width > 768) {
        easing.damp3(ref.current.position, [1.6, 0, 0], 1, delta)
        easing.damp3(ref.current.scale, [1, 1, 1], 1, delta)
      } else {
        easing.damp3(ref.current.position, [0, -0.5, 0], 1, delta)
        easing.damp3(ref.current.scale, [0.7, 0.7, 0.7], 1, delta)
      }
    } else {
      // Transition out
      easing.damp3(ref.current.scale, [0, 0, 0], 0.2, delta)
      if (ref.current.scale.x === 0) {
        ref.current.visible = false
        ref.current.rotation.x = 0
        ref.current.rotation.y = 0
        ref.current.rotation.z = 0
      }
    }
  })


  return <>
    <group ref={ref} position={[1.6, 0, 0]}>
        <Float
          speed={1} // Animation speed, defaults to 1
          rotationIntensity={1.1} // XYZ rotation intensity, defaults to 1
          floatIntensity={0.3} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <mesh ref={boxRef} position={[2.5, 1.6, 1.3]} rotation={[0, 0.4, 0]} scale={0.45} material={standardMaterial}>
              <boxGeometry />
          </mesh>
        </Float>

        <Float
            speed={0.75} // Animation speed, defaults to 1
            rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <mesh ref={capsuleRef} position={[-3, 0, 1]} rotation={[0, 0, 0.47]} scale={0.15} material={standardMaterial}>
              <capsuleGeometry />
          </mesh>
        </Float>

        <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={0} // XYZ rotation intensity, defaults to 1
            floatIntensity={0} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <mesh ref={donutBotRef} position={[2.75, -1, 2]} rotation={[0.4, -0.5, 0]} scale={0.2} material={standardMaterial} geometry={torusGeometry} />
        </Float>

        <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
            floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.01, 0.01]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <mesh ref={donutTopRef} position={[-3.2, 2.5, 3]} rotation={[0.5, 0.9, 0]} scale={0.4} material={standardMaterial} geometry={torusGeometry} />
        </Float>

        <group>
            <ShoeModel position={[-1.4, -1, -1.1]} rotation={[-0.2, 0.6, -0.2]} scale={1.2} color='#ff7300'/>
            <mesh ref={sphereRef} scale={1.8}>
                <sphereGeometry args={[1, 26, 13]}/>
                <meshStandardMaterial
                  color={[0.1, 0.1, 0.1]}
                  emissive={[1.6, 1.6, 1.6]}
                  emissiveIntensity={1.2}
                  toneMapped={false}
                  transparent
                  // opacity={0.1}
                  wireframe
                />
            </mesh>
            <primitive ref={locationModelRef} object={locationModel} />
        </group>

        <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
            floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.01, 0.01]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <mesh ref={coneRef} position={[0.75, -2.5, 2]} rotation={[0, 0.14, 0.6]} scale={0.45} material={standardMaterial}>
              <capsuleGeometry args={[0.35, 0.5, 32]}/>
          </mesh>
        </Float>

      </group>
  </> 
    
})