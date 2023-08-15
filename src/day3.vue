<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";


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

// rgbeLoader 加载hdr贴图
let rgbeLoader = new RGBELoader();
rgbeLoader.load(new URL('./assets/textrue/Alex_Hart-Nature_Lab_Bones_2k.hdr', import.meta.url).href, (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // 设置环境贴图
  scene.background = envMap;
  // 设置环境贴图
  scene.environment = envMap;
});


const controls = new OrbitControls(camera, renderer.domElement);

// 实例化加载器gltf
const gltfLoader = new GLTFLoader();


// 加载模型
gltfLoader.load(
  new URL('./assets/Duck.gltf', import.meta.url).href,
  (gltf: any) => {
    scene.add(gltf.scene)
    const duckMesh = gltf.scene.getObjectByName('LOD3spShape')
    let matcapTexture = new THREE.TextureLoader().load(new URL('./assets/textrue/matcaps/3.png', import.meta.url).href)
    // 设置 光照材质
    duckMesh.material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture

    })
  }
);


onMounted(() => {
  loop()
  resizeListen()
})
</script>
<style  lang='scss' scoped>
.container {}
</style>