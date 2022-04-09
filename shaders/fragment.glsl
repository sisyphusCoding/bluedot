uniform sampler2D globeTexture;
varying vec2 verUV;
varying vec3 vN;

void main() {

    float intensity = 1.05 - dot(vN , vec3(0.0,0.0,1.0));

    vec3 atmo = vec3(0.2,.4,1.0) * pow(intensity , 1.5);

    gl_FragColor = vec4(atmo + texture2D(globeTexture , verUV).xyz, 1.0);
}