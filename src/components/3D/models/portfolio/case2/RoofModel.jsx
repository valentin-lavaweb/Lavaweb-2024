import { useGLTF, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { easing } from "maath"
import { useEffect, useRef } from "react"
import { useStore } from "../../../../../store"


export default function RoofModel(props) {
  const store = useStore()

  const platform1Model = useGLTF('/models/case2/platform1.glb')
  const platform2Model = useGLTF('/models/case2/platform2.glb')
  const platform3Model = useGLTF('/models/case2/platform3.glb')
  const platform4Model = useGLTF('/models/case2/platform4.glb')
  const platform5Model = useGLTF('/models/case2/platform5.glb')
  const platform6Model = useGLTF('/models/case2/platform6.glb')

  const platform1 = useRef()
  const platform2 = useRef()
  const platform3 = useRef()
  const platform4 = useRef()
  const platform5 = useRef()
  const platform6 = useRef()

  const woodMap = useTexture('/models/case2/textures/wood_color.jpg')
  const woodNormalMap = useTexture('/models/case2/textures/wood_nor.jpg')
  platform3Model.materials.Brown.map = woodMap
  platform3Model.materials.Brown.normalMap = woodNormalMap

  const matMap = useTexture('/models/case2/textures/fabric_col.jpg')
  const matNormalMap = useTexture('/models/case2/textures/fabric_nor.jpg')
  const matArmMap = useTexture('/models/case2/textures/fabric_arm.jpg')
  platform4Model.materials.MaterialBottom.map = matMap
  platform4Model.materials.MaterialBottom.normalMap = matNormalMap
  platform4Model.materials.MaterialBottom.metalnessMap = matArmMap
  platform4Model.materials.MaterialBottom.roughnessMap = matArmMap
  platform4Model.materials.MaterialBottom.aoMap = matArmMap

  useEffect(() => {
    platform6.current.children[0].material.transparent = true
    platform6.current.children[0].material.opacity = 0.15
  }, []);

  useFrame((renderer, delta) => {
    if (props.hovered === true && store.openedCase === false) {
      easing.damp3(platform1.current.position, [0, 1, 0], 0.3, delta)
      easing.damp3(platform2.current.position, [0, 0.6, 0], 0.3, delta)
      easing.damp3(platform3.current.position, [0, 0.2, 0], 0.3, delta)
      easing.damp3(platform4.current.position, [0, -0.2, 0], 0.3, delta)
      easing.damp3(platform5.current.position, [0,-0.6, 0], 0.3, delta)
      easing.damp3(platform6.current.position, [0, -1, 0], 0.3, delta)
    } else {
      easing.damp3(platform1.current.position, [0, 0, 0], 0.5, delta)
      easing.damp3(platform2.current.position, [0, 0, 0], 0.5, delta)
      easing.damp3(platform3.current.position, [0, 0, 0], 0.5, delta)
      easing.damp3(platform4.current.position, [0, 0, 0], 0.5, delta)
      easing.damp3(platform5.current.position, [0, 0, 0], 0.5, delta)
      easing.damp3(platform6.current.position, [0, 0, 0], 0.5, delta)
    }
  })

  return (
    <>
      <group scale={0.55}>
        <primitive
          ref={platform1}
          object={platform1Model.scene}
          position={[0, 1, 0]}
        />
        <primitive
          ref={platform2}
          object={platform2Model.scene}
          position={[0, 0.6, 0]}
        />
        <primitive
          ref={platform3}
          object={platform3Model.scene}
          position={[0, 0.2, 0]}
        />
        <primitive
          ref={platform4}
          object={platform4Model.scene}
          position={[0, -0.2, 0]}
        />
        <primitive
          ref={platform5}
          object={platform5Model.scene}
          position={[0,-0.6, 0]}
        />
        <primitive
          ref={platform6}
          object={platform6Model.scene}
          position={[0, -1, 0]}
        />
      </group>
    </>
  );
}