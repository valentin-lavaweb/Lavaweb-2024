import * as THREE from 'three'
import GUI from 'lil-gui'
import { useEffect, useRef } from 'react'

import vertexShader from '../3D/shaders/vertex.glsl'
import blurVertexShader from '../3D/shaders/vertexBlur.glsl'
import fragmentShader from '../3D/shaders/fragment.glsl'
import blurFragmentShader from '../3D/shaders/blurFragment2.glsl' 
// import blurFragmentShader from '../3D/shaders/blurFragment1.glsl' 
import bloomFragmentShader from '../3D/shaders/bloomFragment4.glsl' 
// import bloomFragmentShader from '../3D/shaders/bloomFragment3.glsl' 
// import bloomFragmentShader from '../3D/shaders/bloomFragment2.glsl' 
// import bloomFragmentShader from '../3D/shaders/bloomFragment1.glsl'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { easing } from 'maath'
import { WebGLRenderer } from "three";
// import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export default function MainScene(props) {
    const materialRef = useRef()
    const meshRef = useRef()
    const shader = useRef()
    const bloomShader = useRef()
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
            matcap: matcapMaterial1,
            geometry: new THREE.BoxGeometry(0.1, 0.1, 0.1)
        },
        {
            bg: bg2,
            matcap: matcapMaterial2,
            geometry: new THREE.SphereGeometry(0.05, 5, 5)
        },
        {
            bg: bg3,
            matcap: matcapMaterial3,
            geometry: new THREE.PlaneGeometry(0.1, 0.1)
        },
    ]
    const meshes = Array.from({ length: 300 }, () => ({
        positionRandom: new THREE.Vector3().randomDirection(),
        rotationRandom: Math.PI * Math.random(),
    }))
    const targets = []
    const transitionPlaneTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        colorSpace: THREE.SRGBColorSpace,
    })
    const currentTarget = useRef(0)
    const next = useRef(0)
    const settings = {
        threshold: 0.0,
        strength: 1.0,
        radius: 10.0,
    }
    const params = {
        threshold: 0.275,
        strength: 0.5,
        radius: 0.2,
        exposure: 1.0
    };

    // const gui = new GUI();
    // gui.add(settings, "threshold", 0.0, 1.0, 0.01).onChange((val)=> {})
    // gui.add(settings, "strength", 0.0, 10.0, 0.01).onChange((val)=> {})
    // gui.add(settings, "radius", 0.0, 10.0, 0.01).onChange((val)=> {})

    const gui = new GUI();
    const bloomFolder = gui.addFolder( 'bloom' );

    bloomFolder.add( params, 'threshold', 0.0, 1.0 ).onChange( function ( value ) {
        bloomPass.threshold = Number( value );
    } );

    bloomFolder.add( params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {
        bloomPass.strength = Number( value );
    } );

    gui.add( params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
        bloomPass.radius = Number( value );
    } );
    const toneMappingFolder = gui.addFolder( 'tone mapping' );
    toneMappingFolder.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
        three.gl.toneMappingExposure = Math.pow( value, 4.0 );
    } );


    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ) );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    const composer = new EffectComposer( three.gl );
    composer.addPass( new RenderPass( three.scene, three.camera ) ); //Он почему-то рендерит только всю сцену, scene.children[0 \ 1 \ 2] рендерит только фон....
    composer.addPass( bloomPass );
    // composer.addPass( outputPass );


    // const effectComposer = new EffectComposer(three.gl);
    // effectComposer.setSize(window.innerWidth, window.innerHeight)
    // effectComposer.addPass(new RenderPass(three.scene, three.camera));
    // effectComposer.addPass(new EffectPass(three.camera, new GlitchEffect()));

    useFrame((renderer, delta) => {
        // console.log(composer)
        easing.damp(renderer.camera.position, 'y', -props.deltaY.current * 1, 1 , delta)
        currentTarget.current = Math.floor(props.deltaY.current) % scenes.length
        if (currentTarget.current < 0) {
            currentTarget.current = 3 + currentTarget.current;
        }

        // Зарендерили 1 сцену
        renderer.gl.setRenderTarget(targets[currentTarget.current])
        renderer.gl.render(renderer.scene.children[currentTarget.current + 1], renderer.camera)
        // Переключили значение
        next.current = (currentTarget.current + 1) % scenes.length
        // Зарендерили 2 сцену
        renderer.gl.setRenderTarget(targets[next.current])  
        renderer.gl.render(renderer.scene.children[next.current + 1], renderer.camera)
        // Применили зарендеренные текстуры в главном шейдере
        shader.current.uniforms.uTexture1.value = targets[currentTarget.current].texture
        shader.current.uniforms.uTexture2.value = targets[next.current].texture
        // 
        renderer.gl.setRenderTarget(null)
        // 
        easing.damp(shader.current.uniforms.uProgress, 'value', 
        props.deltaY.current%1 < 0 ? (props.deltaY.current%1) + 1 : props.deltaY.current%1 ,
        0.1,
        delta)
        // Final render
        
        // renderer.gl.render(renderer.scene.children[0], renderer.camera)
        composer.render(renderer.scene.children[0], renderer.camera)
    }, 1)

    function InitPost() {

        return <>
        <scene>
            <mesh>
                <planeGeometry args={[2, 2]}/>
                <shaderMaterial ref={shader}
                    // side={THREE.DoubleSide}
                    // blending={THREE.AdditiveBlending}
                    colorSpace={THREE.SRGBColorSpace}
                    uniforms={
                        {
                            uTexture1: {value: bg1},
                            uTexture2: {value: bg2},
                            uTime: {value: 1.0},
                            uProgress: {value: 0.0}
                        }
                    }
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                />
            </mesh>
        </scene>
        </>
    }

    function CreateScene() {

        useEffect(() => {
            for (let i = 0; i < scenes.length + 1; i++) {
                three.gl.compile(three.scene.children[i], three.camera)
                const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
                    // samples: 2, 
                    // anisotropy: 32, 
                    colorSpace: THREE.SRGBColorSpace,
                    // colorSpace: THREE.LinearSRGBColorSpace,
                })
                targets.push(target)
            }
        }, [])

        function groupRotation(sceneNumber, delta) {
            three.scene.children[sceneNumber].children[1].rotation.y += delta * 0.02
        }
        useFrame((renderer, delta) => {
            // console.log(renderer.scene)
            groupRotation(1, delta)
            groupRotation(2, delta)
            groupRotation(3, delta)
        })
        return <>
            {scenes.map((scene, sceneIndex)=>{
                return (
                <scene key={sceneIndex} background={scene.bg} position={[0, -sceneIndex * viewport.height / 2, 0]}>
                {/* <scene makeDefault key={sceneIndex} position={[0, 0, 0]}> */}
                    <perspectiveCamera position={[0, 0, 0]}/>
                    <mesh scale={0.4}>
                        <boxGeometry />
                        <meshStandardMaterial emissive={[2, 0, 0]}/>
                    </mesh>
                    <group>
                        {meshes.map((mesh, meshIndex) => {
                            return (
                            <mesh 
                            position={mesh.positionRandom}
                            rotation={[mesh.rotationRandom, mesh.rotationRandom, mesh.rotationRandom]}
                            geometry={scene.geometry}
                            key={meshIndex}
                            ref={meshRef}
                            >
                                <meshMatcapMaterial matcap={scene.matcap} />
                            </mesh>
                            )
                        })}
                    </group>
                </scene>
                )
            })}
        </>
    }

    return <>
    <InitPost />
    <CreateScene />
    {/* <OrbitControls /> */}
    </>
}