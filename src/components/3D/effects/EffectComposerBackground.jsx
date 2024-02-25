import * as THREE from 'three'
import { EffectComposer } from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react'
import BackgroundLiquidDistortionComponent from './backgroundLiquid/BackgroundLiquidDistortionComponent.jsx'
import BorderBlurEffectComponent from './borderBlurEffect/BorderBlurEffectComponent.jsx'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useLoader } from '@react-three/fiber'
import { easing } from 'maath'
import { useStore } from '../../../store.jsx'

export default function EffectComposerBlur(props) {
    const store = useStore()
    const [scaleIn, setScaleIn] = useState(true)
    useEffect(() => {
        setScaleIn(!scaleIn)
    }, [props.currentPage])
    const texture = useLoader(RGBELoader, '/backgrounds/backLavaweb.hdr')
    const borderBlurEffectRef = useRef()
    const liquidScaleRef = useRef(1.0)
    const brightnessRef = useRef(1.0)
    const iTimeRef = useRef(0.0)

    const borderBlurSetting = {
        blurRadius: 0.0015,
        centerWidth: 0.79,
        centerHeight: 0.83,
        borderRadius: 0.035,
    }
    const liquidSettings = {
        liquidScale: liquidScaleRef,
        brightness: brightnessRef,
        distortionColor: new THREE.Color("#1b476f"),
        iTime: iTimeRef
    }


    useFrame((renderer, delta) => {

        // store.timeG = performance.now()
        store.cursor.x = renderer.mouse.x * window.innerWidth / 2 + window.innerWidth / 2
        store.cursor.y = -renderer.mouse.y * window.innerHeight / 2 + window.innerHeight / 2
        if (props.currentPage != "/") {
            easing.damp(brightnessRef, 'current', 0.025 , 0.5, delta)
        } else {
            easing.damp(brightnessRef, 'current', 1.0 , 0.5, delta)
        }

        if (scaleIn === true) {
            easing.damp(liquidScaleRef, 'current', 0.5 , 0.5, delta)
        } else {
            easing.damp(liquidScaleRef, 'current', 1.0 , 0.5, delta)
        }
        iTimeRef.current += delta * 0.1
    })


    return <>
    <EffectComposer>
        <BorderBlurEffectComponent ref={borderBlurEffectRef} {...borderBlurSetting}/>
        <BackgroundLiquidDistortionComponent backgroundTexture={texture} {...liquidSettings} />
    </EffectComposer>
    </>
}