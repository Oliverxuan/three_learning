<template>
  <div class='container'></div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import alphaTex from "./assets/textrue/alphaTex.png";
import uv from "./assets/textrue/uv.png";
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,//视角
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5
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
const resizeListen = () => {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}


const controls = new OrbitControls(camera, renderer.domElement);

const TextureLoader = new THREE.TextureLoader()

const texture = TextureLoader.load(alphaTex)
const uvtexture = TextureLoader.load(uv)

// 色差问题
texture.colorSpace = THREE.SRGBColorSpace
const cube = new THREE.PlaneGeometry(1, 1)

// const material = new THREE.MeshBasicMaterial({
//   color: '#ffff00',
//   transparent: true,
//   alphaMap: texture
// })

// const mesh = new THREE.Mesh(cube, material)
// const box = new THREE.BoxGeometry(1, 100, 1)
// const boxmaterial = new THREE.MeshBasicMaterial({
//   color: '#0000ff',
// })
// const boxMesh = new THREE.Mesh(box, boxmaterial)


// scene.add(mesh)
// scene.add(boxMesh)
// scene.fog = new THREE.Fog("#ff00ff", 1, 50)


// // GUI 快速调试
// const gui = new GUI()


// gui.add(mesh.position, "x", -10, 10)
// gui.add(mesh.position, "y", -10, 10)
// gui.add(mesh.position, "z", -10, 10)

const plane = new THREE.PlaneGeometry(2, 2, 2)

const material = new THREE.MeshBasicMaterial({
  map: uvtexture
})

const mesh = new THREE.Mesh(plane, material)
// scene.add(mesh)

const Geometry = new THREE.BufferGeometry()

const points = new Float32Array([-1, -1, 0,
  1, -1, 0,
  1, 1, 0,
-1, 1, 0,])

const uvPosition = new Float32Array([
  0, 0, 1, 0, 1, 1, 0, 1
])

Geometry.setAttribute("uv", new THREE.BufferAttribute(uvPosition, 2))

const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
Geometry.setIndex(new THREE.BufferAttribute(indices, 1))
Geometry.setAttribute("position", new THREE.BufferAttribute(points, 3))

const geoMaterial = new THREE.MeshBasicMaterial({
  map: uvtexture
  // color: "#ffffff"
})

// const cubes = new THREE.Mesh(Geometry, geoMaterial)
// scene.add(cubes)
// console.log(cubes);

const sc = new THREE.DodecahedronGeometry(2, 4)
const sds = new THREE.Mesh(sc, geoMaterial)
sds.position.set(2, 2, 0)
scene.add(sds)

const hep = sds.geometry
// hep.computeBoundingBox()
// const hepx: any = hep.boundingBox
// sds.updateWorldMatrix(true, true)
// hepx?.applyMatrix4(sds.matrixWorld)
const hepx = new THREE.Box3().setFromObject(sds)
let box = new THREE.Box3Helper(hepx, "#ff00ff")
scene.add(box)

let cen = hepx.getCenter(new THREE.Vector3())
console.log(cen);

onMounted(() => {
  loop()
  resizeListen()
})
</script>
<style  lang='scss' scoped>
.container {}
</style>