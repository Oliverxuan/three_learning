<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { reactive, ref, onMounted } from 'vue'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,//视角
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const loop = () => {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
  controls.update(); 
  
}

//  响应式监听窗口变化
const resizeListen = ()=>{
  window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
  })
}

const controls = new OrbitControls(camera, renderer.domElement);

// GUI 快速调试
const gui = new GUI()


onMounted(() => {
  loop()
  resizeListen()
})
</script>
<style  lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>