varying vec2 verUV;

varying vec3 vN;


void main () {

    vN = normalize(normalMatrix * normal);
    verUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}



