<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import * as THREE from "three"
import  {GLTFLoader}  from 'three/examples/jsm/loaders/GLTFLoader.js' 
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
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

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "#ffff00" })
const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
camera.position.z = 15
camera.lookAt(0, 0, 0)
// ---------------------------------------------------------------------
// Axes
// ---------------------------------------------------------------------
var ambientLight = new THREE.AmbientLight("white");
ambientLight.position.set(100, 150, 135); 
scene.add(ambientLight);

const loop = () => {
  requestAnimationFrame(loop)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
  controls.update(); 
}

const loader = new GLTFLoader();
loader.load('/model.gltf', function (gltf:any) {
    const model = gltf.scene;
    scene.add(model);
    console.log("success");
    
}, undefined, function (error:any) {
    console.error(error);
});
const controls = new OrbitControls(camera, renderer.domElement);
onMounted(() => {
  loop()
})
</script>
<style  lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>