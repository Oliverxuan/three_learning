<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { reactive, ref, onMounted } from 'vue'
import { color } from "three/examples/jsm/nodes/Nodes.js";
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

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "#ffff00" })
const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

let parentCube = new THREE.BoxGeometry(2,2,2)
const materials = new THREE.MeshBasicMaterial({ color: "#00ff00" })
const parentsCube = new THREE.Mesh(parentCube, materials)
// scene.add(parentsCube)
parentsCube.add(cube)
parentsCube.position.set(4,0,0)
parentsCube.scale.set(2,2,2)
cube.position.set(2,0,0)
camera.position.z = 5
camera.lookAt(0, 0, 0) 

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const loop = () => {
  requestAnimationFrame(loop)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
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
const cubeFolder = gui.addFolder("cube属性")
cubeFolder.add(cube.position,"x",-5,5).name("cube的x位置").step(1)
cubeFolder.add(cube.position,"y",-5,5).name("cube的y位置")
cubeFolder.add(cube.position,"y",-5,5).name("cube的y位置")
let colorParms ={
  cubeColor: '#FFFFFF'
}
gui.addColor(colorParms,"cubeColor").name("cube的color").onChange((val=>{
  cube.material.color.set(val)
}))


const geometryMy = new THREE.BufferGeometry()
// 逆时针为正面  doubleSide
const points = new Float32Array([-1.0,-1.0,0.0,1.0,-1.0,0.0,1.0,1.0,0.0])
geometryMy.setAttribute("position",new THREE.BufferAttribute(points,3))
const mer = new THREE.MeshBasicMaterial({
  color:"#FFFF00",
})
const mes = new THREE.Mesh(geometryMy,mer)
scene.add(mes)

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