import * as THREE from 'three'
import GUI from 'lil-gui'
import { forwardRef, useEffect, useMemo, useRef } from 'react'

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
import { BlendFunction, BloomEffect, CopyPass, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import BackgroundLavaComponent from './background/BackgroundLavaComponent'

export default forwardRef(function MainScene(props, {
    effectComposer = new EffectComposer( useThree().gl ),
    targets = [
        {target: new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            colorSpace: THREE.SRGBColorSpace,
        })},
        {target: new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            colorSpace: THREE.SRGBColorSpace,
        })},
        {target: new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            colorSpace: THREE.SRGBColorSpace,
        })},
        {target: new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            colorSpace: THREE.SRGBColorSpace,
        })},
    ],
    ref,
}) {
    const transitionScene = useRef()
    const shaderRef = useRef()
    const scenesRef = useRef()
    const scene1 = useRef()
    const scene2 = useRef()
    const scene3 = useRef()
    const scene4 = useRef()
    const three = useThree()
    const loader = new THREE.TextureLoader()
    const bg1 = loader.load('/backgrounds/bg1.png')
    const bg2 = loader.load('/backgrounds/bg2.png')
    const bg3 = loader.load('/backgrounds/bg3.png')
    const currentTarget = useRef(0)
    const next = useRef(0)
    const settings = {
        luminanceThreshold: 0.3,
        luminanceSmoothing: 0.05,
        resolutionScale: 1.0,
        intensity: 2.0,
    }
    // const gui = new GUI();
    // gui.add(settings, "luminanceThreshold", 0.0, 1.0, 0.01).onChange((val)=> {})
    // gui.add(settings, "luminanceSmoothing", 0.0, 10.0, 0.01).onChange((val)=> {})
    // gui.add(settings, "resolutionScale", 0.0, 2.0, 0.01).onChange((val)=> {})
    // gui.add(settings, "intensity", 0.0, 10.0, 0.01).onChange((val)=> {})

    
    useEffect(() => {
        for (let i = 0; i < scenesRef.current.children.length; i++) {
            three.gl.compile(three.scene.children[1].children[i], three.camera)
        }   
        
    }, [])

    useFrame((renderer, delta) => {
        // console.log(currentTarget.current)
        // easing.damp(renderer.camera.position, 'y', -props.deltaY.current * 1, 1 , delta)
        currentTarget.current = Math.floor(props.deltaY.current) % scenesRef.current.children.length
        if (currentTarget.current < 0) {
            // alert(currentTarget.current)
            currentTarget.current = scenesRef.current.children.length + currentTarget.current % scenesRef.current.children.length;
        }

        // Зарендерили 1 сцену
        if (targets != null) {
            renderer.gl.setRenderTarget(targets[currentTarget.current].target)
            renderer.gl.render(scenesRef.current.children[currentTarget.current], renderer.camera)
            // Переключили значение
            next.current = (currentTarget.current + 1) % scenesRef.current.children.length
            // Зарендерили 2 сцену
            renderer.gl.setRenderTarget(targets[next.current].target)  
            renderer.gl.render(scenesRef.current.children[next.current], renderer.camera)
            // Применили зарендеренные текстуры в главном шейдере
            shaderRef.current.uniforms.uTexture1.value = targets[currentTarget.current].target.texture
            shaderRef.current.uniforms.uTexture2.value = targets[next.current].target.texture
        }
        // 
        renderer.gl.setRenderTarget(null)
        // 
        easing.damp(shaderRef.current.uniforms.uProgress, 'value', 
        props.deltaY.current % 1 < 0 ? (props.deltaY.current % 1) + 1 : props.deltaY.current%1 ,
        Math.abs(props.deltaY.current % 1 - props.scroll.current % 1) >= 0.95 ? 0 : 0.5,
        1.0,
        // 0,
        delta)
        // Final render
        effectComposer.render()

    }, 1)

    function InitPost() {

        useEffect(() => {
            effectComposer.addPass(new RenderPass(transitionScene.current, three.camera));
            effectComposer.addPass(new EffectPass(three.camera, new BloomEffect({
                blendFunction: BlendFunction.ADD,
                luminanceThreshold: settings.luminanceThreshold,
                luminanceSmoothing: settings.luminanceSmoothing,
                resolutionScale: settings.resolutionScale,
                intensity: settings.intensity,
                mipmapBlur: true
            })));
        }, [])

        return <>
        <scene ref={transitionScene}>
            <mesh>
                <planeGeometry args={[2, 2]}/>
                <shaderMaterial ref={shaderRef}
                    // side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
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
                {/* <meshBasicMaterial /> */}
            </mesh>
        </scene>
        </>
    }

    return <>
    <InitPost />
    <group ref={scenesRef}>
        <scene ref={scene1} position={[-0.5, 0, 0]}>
            <perspectiveCamera/>
            <BackgroundLavaComponent />
        </scene>
        <scene ref={scene2} background={bg2} position={[0, 0, 0]}>
            <perspectiveCamera/>
            <mesh>
                <boxGeometry />
                <meshBasicMaterial color={'yellow'}/>
            </mesh>
        </scene>
        <scene ref={scene3} background={bg3} position={[0.5, 0, 0]}>
            <perspectiveCamera/>
            <mesh>
                <boxGeometry />
                <meshBasicMaterial color={'purple'}/>
            </mesh>
        </scene>
        <scene ref={scene4} background={bg1} position={[0.5, 0, 0]}>
            <perspectiveCamera/>
            <mesh>
                <boxGeometry />
                <meshBasicMaterial color={'red'}/>
            </mesh>
        </scene>
    </group>
    {/* <OrbitControls /> */}
    </>
})