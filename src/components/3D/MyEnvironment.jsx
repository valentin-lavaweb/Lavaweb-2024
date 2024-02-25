import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, PositionalAudio } from "@react-three/drei"
import { easing } from "maath";
import { useStore } from "../../store";
// import { OrbitControls } from "@react-three/drei";

export default function MyEnvironment(props) {
    const store = useStore()
    const directionalLightRef = useRef()
    // useHelper(directionalLightRef, THREE.DirectionalLightHelper)

    const lightSetting = {
        intensity: 1,
        position: [ 0, 10, 20 ],
        color: 'white',
    }
    // ANIMATION
    useFrame((renderer, delta, eventHandler)=>{
        renderer.camera.lookAt(0, renderer.camera.position.y, 0)

        if (props.currentPage === '/contacts') {
            easing.damp3(directionalLightRef.current.position, [-5, 13.5, 9], 1, delta)
        }
        if (props.currentPage === '/about') {
            easing.damp3(directionalLightRef.current.position, [-5, 13.5, 9], 1, delta)
        }
        if (props.currentPage === '/portfolio') {
            easing.damp3(directionalLightRef.current.position, [-5, 13.5, 9], 1, delta)
            if (store.scroll > 0.35 <= 0.9) {
                easing.damp3(directionalLightRef.current.position, [-5, 0, 50], 1, delta)
            }
        }
        if (props.currentPage === '/portfolio/02') {
            easing.damp3(directionalLightRef.current.position, [-5, 13.5, 9], 1, delta)
        }
        if (props.currentPage === '/portfolio/03') {
            easing.damp3(directionalLightRef.current.position, [-5, 13.5, 9], 1, delta)
        }
        if (props.currentPage === '/portfolio/04') {
            easing.damp3(directionalLightRef.current.position, [0, 0, 1], 1, delta)
        }
        if (props.currentPage === '/portfolio/05') {
            easing.damp3(directionalLightRef.current.position, [-5, 13.5, 9], 1, delta)
        }
    })


    // RETURN
    return <>
    <Environment files={'/backgrounds/environment.hdr'} />
    <group name={"Lights"}>
        <directionalLight ref={ directionalLightRef } {...lightSetting}/>
    </group>
    {/* <OrbitControls /> */}
    {props.startApp && store.soundsActive === true && <PositionalAudio autoplay loop url="/audio/backgroundV2.mp3" distance={30} />}
    </>
}