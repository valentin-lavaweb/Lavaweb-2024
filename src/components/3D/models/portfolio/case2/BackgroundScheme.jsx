import { shaderMaterial, useTexture } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { forwardRef, useState } from "react"


export default forwardRef(function BackgroundScheme(props, ref) {

    const [myOpacity, setMyOpacity] = useState(0)
    
    const texture = useTexture('/models/case2/textures/roofBack.png')

    const MyShaderMaterial = shaderMaterial(
        {
            Uopacity: myOpacity,
            Utexture: texture,
            tDiffuse: null,
        },
        /* GLSL */`
        varying vec2 vUv;
        void main()
        {
            gl_Position = vec4(position.x + 0.5, position.y, position.z + 1.1, 1.1);
            vUv = uv;
        }
        `,
        /* GLSL */`
        uniform sampler2D Utexture;
        uniform float Uopacity;
        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(Utexture, vUv);
            // color.r += 10.0;
            gl_FragColor = vec4(color.r, color.g, color.b, color.a) * Uopacity;
        }

        `
    )

    extend({ MyShaderMaterial })
    
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.uniforms.Uopacity.value = ref.current.opacity;
            setMyOpacity(ref.current.uniforms.Uopacity.value);
        }
    });

    return <>
     <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2, 2, 1, 1]}/>
        <myShaderMaterial ref={ref} transparent={true} wireframe={false}/>
     </mesh>
    </>
})