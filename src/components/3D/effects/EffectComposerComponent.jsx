import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import BlurEffectComponent from './blurEffect/BlurEffectComponent.jsx'
import { PositionalAudio, useTexture } from '@react-three/drei'
import { useStore } from '../../../store.jsx'

export default function EffectComposerComponent(props) {
    const store = useStore()
    const blurEffectRef = useRef()
    const bloomRef = useRef()
    const tpSoundRef = useRef()
    
    const texture = useTexture('/backgrounds/backgroundTexture2.jpg')
    const [textureColor, setTexturecolor] = useState("#000000")
    useEffect(() => {
        if (tpSoundRef.current != null) {
            tpSoundRef.current.stop()
            tpSoundRef.current.play()
        }
    }, [])

    const blendFactorRef = useRef(0.0);
    const blurRadiusRef = useRef(0.0);
    const blurSetting = {
        blurRadius: blurRadiusRef,
        blendFactor: blendFactorRef,
        backgroundOpacity: 0.75,
    }

    const color = new THREE.Color(textureColor)

    
    useFrame((renderer, delta)=> {
        // BLUR ANIMATION
        // easing.damp(blendFactorRef, 'current', 0.0, 0.25 , delta)
        // easing.damp(blurRadiusRef, 'current', 0.002, 1 , delta)
        // easing.damp(bloomRef.current, 'intensity', 5, 1, delta)
        // easing.damp(bloomRef.current.luminanceMaterial, 'threshold', 1.0, 0.5, delta)
        // easing.damp(bloomRef.current.luminanceMaterial, 'smoothing', 0.0, 0.1, delta)  
    })

    return <>
    <EffectComposer stencilBuffer={true} >
        {/* <BlurEffectComponent ref={blurEffectRef} {...blurSetting} color={color} backgroundTexture={texture}/> */}
        <Bloom mipmapBlur={true} ref={bloomRef} />
    </EffectComposer>
    {/* <PositionalAudio ref={tpSoundRef} loop={false} url="/audio/teleportV4.mp3" distance={30} /> */}
    </> 
}