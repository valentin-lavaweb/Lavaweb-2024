import * as THREE from 'three'
import { useTexture, useGLTF, Html} from "@react-three/drei"
import { useRef, forwardRef, useEffect, useState } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { DoubleSide } from "three"
import { easing } from "maath"
import { useStore } from "../../../../../store"



export default forwardRef(function Case1Model(props, ref) {
  const store = useStore()

  const { camera } = useThree();

  
  const [pointerDown, setPointerDown] = useState(false)

  const nipigasCircles = useRef()
  const circle1 = useRef()
  const circle2 = useRef()
  const circle3 = useRef()
  const nipigasLogo = useRef()
  const case1Model = useRef()

  const newLogoModel = useGLTF('/models/case1/NipigasLogoModel.glb')

  const Circle1texture = useTexture('/images/c1.png')  
  Circle1texture.anisotropy = 16

  const logoMaterialSet ={
    color: '#008c95',
    roughness: 0,
    metalness: 1,
    // reflectivity: 1,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
    // DoubleSide: true,
    toneMapped: true
  }
  const circlesMaterialSet = {
    color: [1, 1, 1],
    emissive: {
      isColor: true,
      r: 0.2,
      g: 0.6,
      b: 1.0,
    },
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    emissiveIntensity: 2,
    map: Circle1texture,
    side: DoubleSide,
  }
  const standardLogoMaterial = new THREE.MeshStandardMaterial({
    ...logoMaterialSet
  })
  const standardCirclesMaterial = new THREE.MeshStandardMaterial({
    ...circlesMaterialSet
  })

  const nipigasCircleGeometry = new THREE.PlaneGeometry(1, 1, 16)

  // Removed bug with fast changing pages and delay 500
  useEffect(()=>{
    newLogoModel.materials.contourMat.color.r = 0
    newLogoModel.materials.contourMat.color.g = 1
    newLogoModel.materials.contourMat.color.b = 2
    newLogoModel.materials.contourMat.emissive.r = 0
    newLogoModel.materials.contourMat.emissive.g = 1
    newLogoModel.materials.contourMat.emissive.b = 2
    newLogoModel.materials.contourMat.emissiveIntensity = 0.9
    newLogoModel.materials.contourMat.toneMapped = false
  },[])
  
  useFrame((renderer, delta) => {

  })

  // console.log(circle1.current)

  return <>

  <group ref={ref} position={[0, 0, 0]} onPointerDown={(e) => {setPointerDown(true)}} onPointerUp={() => {setPointerDown(false)}}>
    <group ref={case1Model} scale={0.275}>

      <group ref={nipigasCircles}>
        <mesh ref={circle1} rotation={[2.2, 0.6, 0]} scale={27} material={standardCirclesMaterial} geometry={nipigasCircleGeometry} />
        <mesh ref={circle2} rotation={[1.8, 0.2, 0]} scale={23} material={standardCirclesMaterial} geometry={nipigasCircleGeometry} />
        <mesh ref={circle3} rotation={[1.88, 0.15, 0]} scale={15} material={standardCirclesMaterial} geometry={nipigasCircleGeometry} />
      </group>

      <group ref={nipigasLogo} scale={0.75}>

        <mesh {...newLogoModel.nodes.logoCircle} material={standardLogoMaterial} />
        <mesh {...newLogoModel.nodes.logoCircleContour} />

        <mesh {...newLogoModel.nodes.logoFire} material={standardLogoMaterial} />
        <mesh {...newLogoModel.nodes.logoFireContour} />

        <mesh {...newLogoModel.nodes.separator} material={standardLogoMaterial} />

        <mesh {...newLogoModel.nodes.numberFifty} material={standardLogoMaterial} />
        <mesh {...newLogoModel.nodes.numberFiftyContour} />

      </group>

    </group>

  </group>

  </>
})