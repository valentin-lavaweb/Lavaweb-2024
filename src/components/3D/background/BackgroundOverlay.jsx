import { AdaptiveDpr, MeshTransmissionMaterial, useTexture } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { RGBELoader } from 'three-stdlib'
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { easing } from "maath";
import { useStore } from "../../../store.jsx";



export default function BackgroundOverlay(props) {
    const [transition, setReadyPage] = useState(false)
    const location = useLocation()
    const store = useStore()

    useEffect(() => {
        setReadyPage(!transition)
        setTimeout(() => {
            setReadyPage(!transition)
        }, 500);
    }, [location])

    const meshRef = useRef();
    const matRef = useRef();
    // const configControls = useControls({
        // backside: false,
        // backsideThickness: { value: 0, min: 0, max: 2 },
        // samples: { value: 16, min: 1, max: 32, step: 1 },
        // resolution: { value: 256, min: 64, max: 2048, step: 64 },
        // clearcoat: { value: 0, min: 0.1, max: 1 },
        // clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
        // thickness: { value: 2.75, min: 0, max: 5 },
        // chromaticAberration: { value: 0.25, min: 0, max: 5 },
        // anisotropy: { value: 1, min: 0, max: 1, step: 0.01 },
        // roughness: { value: 0.02, min: 0, max: 1, step: 0.01 },
        // distortion: { value: 0.85, min: 0, max: 4, step: 0.01 },
        // distortionScale: { value: 0.52, min: 0.01, max: 1, step: 0.01 },
        // temporalDistortion: { value: 0.01, min: 0, max: 1, step: 0.01 },
        // ior: { value: 3.0, min: 0, max: 3, step: 0.01 },
        // color: '#00ABFF',
        // gColor: '#00DCD7',
        // shadow: '#0E2295',
    // })

    const config = {
        backside: false,
        backsideThickness: 0,
        samples: 16,
        resolution: 256,
        transmission: 1,
        thickness: 5,
        roughness: 0.02,
        anisotropy: 0.2,
        distortion: 0.85,
        chromaticAberration: 0.25,
        distortionScale: 0.52,
        temporalDistortion: 0.01,
        ior: 3,
        color: {
            r: 0.0,
            g: 0.45,
            b: 1.25
        }
    }
    const texture = useLoader(RGBELoader, '/backgrounds/backLavaweb.hdr')

    useFrame((renderer, delta) => {

        

        if (transition === true) {
            easing.damp(matRef.current, 'distortionScale', 1.0, 0.5, delta)
        } else {
            easing.damp(matRef.current, 'distortionScale', 0.52, 0.5, delta)
        }

        if (location.pathname === '/') {
            easing.damp(matRef.current.color, 'r', 0.0, 1, delta)
            easing.damp(matRef.current.color, 'g', 0.45, 1, delta)
            easing.damp(matRef.current.color, 'b', 1.25, 1, delta)
            easing.damp(matRef.current, '_transmission', 0.5, 1, delta)
        }
        if (location.pathname.split('/')[1] === 'portfolio') {
            if (location.pathname.split('/')[2] === undefined){
                easing.damp(matRef.current.color, 'r', 0.0, 1, delta)
                easing.damp(matRef.current.color, 'g', 0.4, 1, delta)
                easing.damp(matRef.current.color, 'b', 0.6, 1, delta)
                easing.damp(matRef.current, '_transmission', 0.025, 1, delta)
            }
            if (location.pathname.split('/')[2] === '02'){
                easing.damp(matRef.current.color, 'r', 0.26, 1, delta)
                easing.damp(matRef.current.color, 'g', 0.3, 1, delta)
                easing.damp(matRef.current.color, 'b', 0.3, 1, delta)
                easing.damp(matRef.current, '_transmission', 0.05, 1, delta)
            }
            if (location.pathname.split('/')[2] === '03'){
                easing.damp(matRef.current.color, 'r', 0.1, 1, delta)
                easing.damp(matRef.current.color, 'g', 0.1, 1, delta)
                easing.damp(matRef.current.color, 'b', 0.1, 1, delta)
                easing.damp(matRef.current, '_transmission', 0.025, 1, delta)
            }
            if (location.pathname.split('/')[2] === '04'){
                easing.damp(matRef.current.color, 'r', 1, 1, delta)
                easing.damp(matRef.current.color, 'g', 0.15, 1, delta)
                easing.damp(matRef.current.color, 'b', 0.0, 1, delta)
                easing.damp(matRef.current, '_transmission', 0.15, 1, delta)
            }
            if (location.pathname.split('/')[2] === '05'){
                easing.damp(matRef.current.color, 'r', 0.05, 1, delta)
                easing.damp(matRef.current.color, 'g', 0.05, 1, delta)
                easing.damp(matRef.current.color, 'b', 0.1, 1, delta)
                easing.damp(matRef.current, '_transmission', 0.15, 1, delta)
            }
        }
        if (location.pathname.split('/')[1] === 'about') {
            easing.damp(matRef.current.color, 'r', 0.0, 1, delta)
            easing.damp(matRef.current.color, 'g', 0.45, 1, delta)
            easing.damp(matRef.current.color, 'b', 1.25, 1, delta)
            easing.damp(matRef.current, '_transmission', 0.05, 1, delta)
        }
        if (location.pathname.split('/')[1] === 'contacts') {
            easing.damp(matRef.current.color, 'r', 0.0, 1, delta)
            easing.damp(matRef.current.color, 'g', 0.25, 1, delta)
            easing.damp(matRef.current.color, 'b', 0.5, 1, delta)
            easing.damp(matRef.current, '_transmission', 0.25, 1, delta)
            easing.damp(matRef.current, 'distortion', 0.85, 1, delta)
        }
    })

    return <>
    {/* <AdaptiveDpr pixelated /> */}
     <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10, 1, 1]} />
        <MeshTransmissionMaterial ref={matRef} {...config} background={texture}/>
     </mesh>
    </>
}