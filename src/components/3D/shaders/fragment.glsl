uniform float time;
uniform float progress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main() 
{
    // vec4 t = texture2D(uTexture1, vUv);
    // float sweep = step(progress, vUv.y);

    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}