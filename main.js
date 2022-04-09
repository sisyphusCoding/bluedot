import './style.sass'

import gsap from 'gsap'

import * as THREE from 'three'

import vS from './shaders/vertex.glsl'

import fS from './shaders/fragment.glsl'

import atmosV from './shaders/atmosV.glsl'

import atmosF from './shaders/atmosF.glsl'
import { Float32BufferAttribute } from 'three'

const scene =  new THREE.Scene()

const canvasWrap = document.querySelector('#canvasWrap')


const camera = new THREE.PerspectiveCamera(100 , window.innerWidth / window.innerHeight , 0.1 , 1000)

const renderer = new THREE.WebGLRenderer(
  {antialias: true ,
  canvas: canvasWrap ,
  },
  
)




renderer.setSize(canvasWrap.offsetWidth , canvasWrap.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)




const starG = new THREE.BufferGeometry()

const starM = new THREE.PointsMaterial({
  color: 0xffffff,
})


const starV = []

for(let i = 0 ; i < 10000 ; i++){
  const x = (Math.random() - .5) * 2000
  const y = (Math.random() - .5) * 2000
  const z = -Math.random() * 5000

  starV.push(x , y , z)

}


starG.setAttribute('position' , new THREE.Float32BufferAttribute(starV , 3))

const starts = new THREE.Points (
  starG,starM
)

scene.add(starts)



//sphere





const sphere = new THREE.Mesh(

  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({

    vertexShader : vS,
    fragmentShader : fS,

    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/earth.jpg')
      }
    }

    //map:  new THREE.TextureLoader().load('./img/earth.jpg')

      })

)

scene.add(sphere)


//atmo

const atmosphere = new THREE.Mesh(

  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({

    vertexShader : atmosV,
    fragmentShader : atmosF,
    blending : THREE.AdditiveBlending,
    side: THREE.BackSide
    
      })

)

atmosphere.scale.set(1.1,1.1,1.1)




const group = new THREE.Group()

group.add(sphere)

scene.add(atmosphere)

scene.add(group)



camera.position.z = 12


const mouse = {
  x: undefined,
  y: undefined
}


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
  sphere.rotation.y += 0.01
  //camera.position.z -= 0.09
  gsap.to(group.rotation,{
    y: mouse.x * .5,
    x: -mouse.y * .5,
    duration: 2
  })
}



animate()



addEventListener('mousemove' , (e) => {

mouse.x = (event.clientX / window.innerWidth) * 2 + 1

mouse.y = -(event.clientY / window.innerHeight) * 2 + 1


console.log(mouse.x , mouse.y)

})