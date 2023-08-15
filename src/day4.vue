<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import alphaTex from "./assets/textrue/alphaTex.png";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

import uv from "./assets/textrue/uv.png";
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,//视角
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 22
// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
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
const resizeListen = () => {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}


const controls = new OrbitControls(camera, renderer.domElement);

// 创建球几何体
const sphereGeometry = new THREE.SphereBufferGeometry(3, 30, 30);
delete sphereGeometry.attributes.uv;
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(sphereGeometry, material);
// scene.add(mesh);

// 设置点材质
const pointsMaterial = new THREE.PointsMaterial();
pointsMaterial.size = 0.4;
pointsMaterial.color.set(0xfff000);
// 相机深度而衰减
pointsMaterial.sizeAttenuation = true;

// 载入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(new URL('./assets/textrue/particles/9.png', import.meta.url).href);
// 设置点材质纹理
pointsMaterial.map = texture;
// 透明度贴图
pointsMaterial.alphaMap = texture;
// 透明
pointsMaterial.transparent = true;
// 是否对深度缓存器影响
pointsMaterial.depthWrite = false;
// 叠加方式 相加
pointsMaterial.blending = THREE.AdditiveBlending;

const points = new THREE.Points(sphereGeometry, pointsMaterial);

scene.add(points);

renderer.shadowMap.enabled = true;
renderer.useLegacyLights = true;


onMounted(() => {
  loop()
  resizeListen()
})
</script>
<style  lang='scss' scoped>
.container {}
</style>