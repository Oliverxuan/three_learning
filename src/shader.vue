<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// 顶点着色器
import { } from "./shader/base/fragment.glsl";


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,//视角
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true;


// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const clock = new THREE.Clock()

const loop = () => {
  const tTime = clock.getElapsedTime()
  shaderMaterial.uniforms.uTime.value = tTime
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
  controls.update();
}

//  响应式监听窗口变化
const resizeListen = () => {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

const controls = new OrbitControls(camera, renderer.domElement);

const textureLoader = new THREE.TextureLoader()
const flagTexture = textureLoader.load(new URL('./assets/textrue/uv_grid_opengl.jpg', import.meta.url).href)
console.log(flagTexture);

const shaderMaterial = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  transparent: true,
  // wireframe: true,
  vertexShader: `
precision lowp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;

varying vec2 vUv;
varying float vHeight;



  void main(){
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vHeight = modelPosition.y;
    modelPosition.z = sin((modelPosition.x + uTime) * 10.0) *0.1;
    modelPosition.z += sin((modelPosition.y + uTime) * 10.0) *0.1;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
   
  }
  `,
  fragmentShader: `
  precision lowp float;

  varying vec2 vUv;
  uniform sampler2D uTexture;


  void main(){
      // gl_FragColor = vec4(vUv,0.0,vUv[1]);

      // uv
      // texture2D 材质采样器
      vec4 textureColor = texture2D(uTexture,vUv);
      gl_FragColor = textureColor;
  }
  `,
  uniforms: {
    uTime: {
      value: 0
    },
    uTexture: {
      value: flagTexture
    }
  }
})

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 64, 64),
  shaderMaterial
)


scene.add(floor)


onMounted(() => {
  loop()
  resizeListen()
})
</script>
<style  lang='scss' scoped>
.container {}
</style>