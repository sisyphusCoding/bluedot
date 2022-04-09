
varying vec3 vN;

void main() {

    float intensity = pow( .65 - dot( vN , vec3(0.0,0.0,1.0))  , 1.7);

    gl_FragColor = vec4(0.3 ,0.6 ,.8 , .8 ) * intensity;
}
