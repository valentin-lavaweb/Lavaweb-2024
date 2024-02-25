import * as THREE from 'three'
import { useEffect, useRef } from 'react'

import vertexShader from '../3D/shaders/vertex.glsl'
import fragmentShader from '../3D/shaders/fragment.glsl'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function MainScene(props) {
    const materialRef = useRef()
    const meshRef = useRef()
    const {viewport} = useThree()
    const three = useThree()
    const matcapMaterial1 = new THREE.TextureLoader().load('/matcaps/matcap1.png')
    const matcapMaterial2 = new THREE.TextureLoader().load('/matcaps/matcap2.png')
    const matcapMaterial3 = new THREE.TextureLoader().load('/matcaps/matcap3.png')
    const bg1 = new THREE.TextureLoader().load('/backgrounds/bg1.png')
    const bg2 = new THREE.TextureLoader().load('/backgrounds/bg2.png')
    const bg3 = new THREE.TextureLoader().load('/backgrounds/bg3.png')
    const scenes = [
        {
            bg: bg1,
            matcap: matcapMaterial1
        },
        {
            bg: bg2,
            matcap: matcapMaterial2
        },
        {
            bg: bg3,
            matcap: matcapMaterial3
        },
    ]
    const meshes = Array.from({ length: 300 }, () => ({
        positionRandom: new THREE.Vector3().randomDirection(),
        rotationRandom: Math.PI * Math.random(),
    }))
    // console.log(three)

    useFrame((renderer, delta) => {
        // console.log(renderer)
        renderer.gl.render(renderer.scene.children[0], renderer.camera)
    })

    function CreateScene() {
        return <>
            {scenes.map((scene, sceneIndex)=>{
                return (
                <scene makeDefault key={sceneIndex} background={scene.bg} position={[sceneIndex, 0, 0]}>
                    {meshes.map((mesh, meshIndex) => {
                        return (
                        <mesh 
                        position={mesh.positionRandom}
                        rotation={[mesh.rotationRandom, mesh.rotationRandom, mesh.rotationRandom]}
                        scale={0.2}
                        key={meshIndex}
                        ref={meshRef}
                        >
                            <boxGeometry args={[1, 1, 1]} />
                            <meshMatcapMaterial matcap={scene.matcap} />
                        </mesh>
                        )
                    })}
                    {/* <mesh position={[0, 0, 1]}>
                        <planeGeometry args={[viewport.width, viewport.height, 1, 1]}/>
                        <shaderMaterial ref={materialRef}
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        transparent={true}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                        // blending={THREE.AdditiveBlending}
                        uniforms={
                            {
                                uTime: new THREE.Uniform(0),
                                uColor: new THREE.Uniform(new THREE.Color('red'))
                            }
                        }/>
                    </mesh> */}
                </scene>
                )
            })}
        </>
    }

    return <>
    <OrbitControls />
    <CreateScene />
    </>
}