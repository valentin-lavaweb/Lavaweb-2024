import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { forwardRef, useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";
import * as THREE from 'three'
import lerp from "../../../../../functions/lerp";
import { useStore } from "../../../../../store";



export default forwardRef(function Case3Model(props, ref){
    const store = useStore()

    const { camera } = useThree();

    const [activePage, setActivePage] = useState(true)
    const [transition1, setTransition1] = useState(false)
    const [transition2, setTransition2] = useState(false)
    const [transition3, setTransition3] = useState(false)

    // const craneModel = useGLTF('/models/case3/crane.glb')
    const craneModel = useGLTF('/models/case3/crane1.glb')
    // console.log(craneModel.scene.children[0].children[4].material.alphaMap = alphaMap)
    const craneModelRef = useRef()
    const lightRef1 = useRef()
    const lightRef2 = useRef()
    const materialRef1 = useRef()
    const materialRef2 = useRef()
    const materialRef3 = useRef()
    const materialRef4 = useRef()
    const materialRef5 = useRef()
    const materialRef6 = useRef()
    const materialRef7 = useRef()

    useEffect(() => {
        if ( props.currentPage === '/portfolio/03' ) {
            setTimeout(() => { 
                setActivePage(true) 
            }, 500);
            setTimeout(() => { setTransition1(true) }, 650);
        } else {
            setActivePage(false)
            setTransition1(false)
            setTransition2(false)
            setTransition3(false)
        }
    }, [props.currentPage])
    
    // Removed bug with fast changing pages and delay 500
    useEffect(()=>{
        if (props.currentPage === `/portfolio/03`){
            store.scroll = 0
            camera.position.x = 0
            camera.position.y = 0
            camera.position.z = 9
            camera.lookAt(0,0,0)
        }
        if (props.currentPage != `/portfolio/03`){
            setActivePage(false)
        }
    },[activePage])

    const alphaMap = useTexture('/models/case3/textures/walk_Opacity.jpg')
    useEffect(() => {
        materialRef5.current.alphaMap = alphaMap
    }, [])

    const positionSettings = {
        position: [3, -5, 0],
        rotation: [0, 3.14, 0],
    }
    const emissiveSetting = {
        emissive: [15, 0, 0],
        emissiveIntensity: 5,
        color: [5, 2, 2],
        toneMapped: false
    }

    // const standardMaterrial = new THREE.MeshStandardMaterial()

    useFrame((renderer, delta) => {
        if (activePage === true) {
            ref.current.visible = true

            // MODEL POSITION
            // console.log(((window.innerWidth - minW) / (maxW - minW)) * (maxP - minP) + minP)
            if (renderer.size.width <= 480) {
                if (transition1 === true) {
                    easing.damp3(ref.current.position, [((window.innerWidth - 200) / (480 - 200)) * (2 - 1.5) + 1.5, -5, 0], 1, delta)
                } else {
                    easing.damp3(ref.current.position, [1, -5, 0], 1, delta)
                }
            }
            if (renderer.size.width > 480 && renderer.size.width <= 640) {
                if (transition1 === true) {
                    easing.damp3(ref.current.position, [((window.innerWidth - 480) / (640 - 480)) * (3 - 2) + 2, -5, 0], 1, delta)
                } else {
                    easing.damp3(ref.current.position, [1, -5, 0], 1, delta)
                }
            }
            if (renderer.size.width > 640 && renderer.size.width <= 768) {
                easing.damp3(ref.current.position, [1, -5, 0], 0.2, delta)
            }
            if (renderer.size.width > 768) {
                easing.damp3(ref.current.position, [3.5, -5, 0], 0.2, delta)
            }
            // Transition in
            if (materialRef1.current.opacity < 1) { easing.damp(materialRef1.current, 'opacity', 1, 2, delta) }
            if (materialRef2.current.opacity < 1) { easing.damp(materialRef2.current, 'opacity', 1, 2, delta) }
            if (materialRef3.current.opacity < 1) { easing.damp(materialRef3.current, 'opacity', 1, 2, delta) }
            if (materialRef4.current.opacity < 1) { easing.damp(materialRef4.current, 'opacity', 1, 2, delta) }
            if (materialRef5.current.opacity < 1) { easing.damp(materialRef5.current, 'opacity', 1, 2, delta) }
            if (materialRef6.current.opacity < 1) { easing.damp(materialRef6.current, 'opacity', 1, 2, delta) }
            if (materialRef7.current.opacity < 1) { easing.damp(materialRef7.current, 'opacity', 1, 2, delta) }

            // Transition animation
            if (renderer.size.width <= 480) {
                if (transition1 === true) {
                    easing.damp3(renderer.camera.position, [-2,30,9], 3, delta)
                    if (renderer.camera.position.y >= 29) {
                        setTransition2(true)
                        setTransition1(false)
                    }
                }
                if (transition2 === true) {
                    easing.damp3(renderer.camera.position, [-4,34.25,23], 6, delta)
                }
            }
            if (renderer.size.width > 480 && renderer.size.width <= 640) {
                if (transition1 === true) {
                    easing.damp3(renderer.camera.position, [-4,30,9], 3, delta)
                    if (renderer.camera.position.y >= 29) {
                        setTransition2(true)
                        setTransition1(false)
                    }
                }
                if (transition2 === true) {
                    easing.damp3(renderer.camera.position, [-4,34.25,23], 6, delta)
                }
            }
            if (renderer.size.width > 640 && renderer.size.width <= 768) {
                if (transition1 === true) {
                    easing.damp3(renderer.camera.position, [-4,30,9], 3, delta)
                    if (renderer.camera.position.y >= 29) {
                        setTransition2(true)
                        setTransition1(false)
                    }
                }
                if (transition2 === true) {
                    easing.damp3(renderer.camera.position, [-4,34.25,23], 6, delta)
                }
            }
            if (renderer.size.width > 768) {
                if (transition1 === true) {
                    easing.damp3(renderer.camera.position, [-3,30,9], 3, delta)
                    if (renderer.camera.position.y >= 29) {
                        setTransition2(true)
                        setTransition1(false)
                    }
                }
                if (transition2 === true) {
                    easing.damp3(renderer.camera.position, [-4,34.25,23], 6, delta)
                }
            }
            
            // Model animation with cursor
            let lerpRotationY = lerp(craneModelRef.current.rotation.y, renderer.mouse.x * 0.025, delta)
            craneModelRef.current.rotation.y = lerpRotationY
        } else {
            // Transition out
            if (materialRef1.current.opacity > 0) { easing.damp(materialRef1.current, 'opacity', 0, 0.15, delta) }
            if (materialRef2.current.opacity > 0) { easing.damp(materialRef2.current, 'opacity', 0, 0.15, delta) }
            if (materialRef3.current.opacity > 0) { easing.damp(materialRef3.current, 'opacity', 0, 0.15, delta) }
            if (materialRef4.current.opacity > 0) { easing.damp(materialRef4.current, 'opacity', 0, 0.15, delta) }
            if (materialRef5.current.opacity > 0) { easing.damp(materialRef5.current, 'opacity', 0, 0.15, delta) }
            if (materialRef6.current.opacity > 0) { easing.damp(materialRef6.current, 'opacity', 0, 0.15, delta) }
            if (materialRef7.current.opacity > 0) { easing.damp(materialRef7.current, 'opacity', 0, 0.15, delta) }
            if (materialRef1.current.opacity === 0) {
                ref.current.visible = false
            }
        }
    })

    return <>
    <group ref={ref} {...positionSettings} visible={false}>

        <group ref={craneModelRef}>
            <mesh {...craneModel.nodes.craneMain}>
                <meshStandardMaterial ref={materialRef1} {...craneModel.materials.MetalNew} metalness={0.9} transparent={true} />
            </mesh>
            <mesh {...craneModel.nodes.craneDetails}>
                <meshStandardMaterial ref={materialRef2} {...craneModel.materials.metalMaterial} metalness={0.9} transparent={true} />
            </mesh>
            <mesh {...craneModel.nodes.wires}>
                <meshStandardMaterial ref={materialRef3} {...craneModel.materials.wiresMaterial} metalness={0.9} transparent={true} />
            </mesh>
            <mesh {...craneModel.nodes.stairs}>
                <meshStandardMaterial ref={materialRef4} {...craneModel.materials.metalMaterial} metalness={0.9} transparent={true} />
            </mesh>
            <mesh {...craneModel.nodes.setka_1}>
                <meshStandardMaterial ref={materialRef5} {...craneModel.materials.Material_2} metalness={0.9} transparent={true}/>
            </mesh>
            <mesh ref={lightRef1}{...craneModel.nodes.lightSphere1}>
                <meshStandardMaterial ref={materialRef6} color="red" {...emissiveSetting} transparent={true} />
            </mesh>
            <mesh ref={lightRef2}{...craneModel.nodes.lightSphere2}>
                <meshStandardMaterial ref={materialRef7} color="red" {...emissiveSetting} transparent={true} />
            </mesh>
        </group>

    </group>
    </>
})