import * as THREE from 'three'
import { shaderMaterial, useTexture } from "@react-three/drei"
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef } from "react"
import { useControls } from 'leva'
import { RGBELoader } from 'three-stdlib'

export default function BackgroundLavaComponent(props) {
    const three = useThree()
    // console.log(three)

    const materialRef = useRef()
    const lavaMesh = useRef()
    const noiseTexture = useTexture('/images/perlinNoise.png')
    const backgroundTexture = useLoader(RGBELoader, '/backgrounds/backLavaweb.hdr')
    const controls = useControls({
        distortionPower: { value: 0.3, min: 0, max: 20 },
        distortionScale: { value: 1, min: 0, max: 100 },
    })

    useFrame((renderer, delta) => {
        materialRef.current.iTime += delta * 0.05
        // lavaMesh.current.position.y = renderer.camera.position.y
    })

    useEffect(() => {
        materialRef.current.precision = "lowp"
    }, [])


    return <>
    <mesh ref={lavaMesh} position={[0, 0, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[three.viewport.width * 1.6, three.viewport.height * 1.6]}/>
        <lavaMaterial ref={materialRef} backgroundTexture={backgroundTexture} noiseTexture={noiseTexture} distortionPower={controls.distortionPower}
        distortionScale={controls.distortionScale}/>
    </mesh>
    </>
}

export const LavaMaterial = shaderMaterial(
    {
        // wireframe: true,
      backgroundTexture: null,
      noiseTexture: null,
      distortionPower: null,
      distortionScale: null,
      distortionColor: new THREE.Color("#1b476f"),
      uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      uLiquidScale: 1.0,
      iTime: 0.0,
    },
    
    /* glsl */
    `
    varying vec2 vUv;
    uniform vec2 uResolution;
    uniform float uLiquidScale;
    void main() {
        vUv = uv;
        
        vec2 center = vec2(0.5);
        vec2 liquidScaleXY = vec2(uLiquidScale, uLiquidScale);
        
        // Масштабируем uv относительно центра
        vUv = center + (vUv - center) * liquidScaleXY;
        
        // Вычисляем разницу в соотношении сторон между экраном и текстурой
        float aspectX = uResolution.x / uResolution.y;
        float aspectY = 1.0;
        
        // Если экран шире, чем текстура, то корректируем масштаб по Y
        if (aspectX > 1.0) {
            aspectY = 1.0 / aspectX;
            aspectX = 1.0;
        }
        
        // Вычисляем сдвиг по X и Y, чтобы центрировать текстуру
        float xOffset = (1.0 - aspectX) / 2.0;
        float yOffset = (1.0 - aspectY) / 2.0;
        
        // Применяем масштабирование по соотношению сторон и сдвиг
        vUv.x = vUv.x * aspectX + xOffset;
        vUv.y = vUv.y * aspectY + yOffset;
        
        // Применяем искажение к однородным координатам uv
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`
    ,
        
    /* glsl */
    `
    varying vec2 vUv;
    uniform sampler2D backgroundTexture;
    uniform sampler2D noiseTexture;
    uniform vec3 distortionColor;
    uniform float distortionPower;
    uniform float iTime;

    void main() {  
        // Получаем шум
        float noise = texture(noiseTexture, vUv).r;

        vec2 offset = distortionPower * vec2(fract(noise + iTime) * 0.75);
        
    
        // Получаем искаженные координаты UV с использованием iTime в качестве коэффициента масштабирования
        vec2 distortedUV = vUv + offset;
    
        // Используем искаженные координаты UV для сэмплирования текстуры
        vec4 color = texture2D(backgroundTexture, distortedUV);
    
        // Изменяем цвет
        color.rgb *= distortionColor.rgb;
    
        // Затемняем цвет
        float darkeningFactor = 0.25;
        color.rgb *= darkeningFactor;
    
        gl_FragColor = color;

        #include <tonemapping_fragment>
        // #include <encodings_fragment>
        #include <colorspace_fragment>
    }`
)

extend({LavaMaterial})