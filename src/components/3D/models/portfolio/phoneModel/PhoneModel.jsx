import { forwardRef, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

export default forwardRef(function PhoneMap(props, ref) {
    const phoneModel = useGLTF('/models/case1/case1Phone.glb')
    const case1map = useTexture('/models/case1/case1PhoneMap.jpg')
    const case2map = useTexture('/models/case2/case2PhoneMap.jpg')
    const [transitionOut, setTransitionOut] = useState(false)



    useEffect(() => {
        phoneModel.materials.DisplayMat.mapIntensity = 1
        phoneModel.materials.DisplayMat.color.r = 1
        phoneModel.materials.DisplayMat.color.g = 1
        phoneModel.materials.DisplayMat.color.b = 1
        phoneModel.materials.DisplayMat.map = case1map
        phoneModel.materials.DisplayMat.envMapIntensity = 0.15
    }, [])

    useFrame((renderer, delta) => {
    })

    
    return <>
    <group ref={ref}>
      <primitive object={phoneModel.scene} />
    </group>
    </>
})