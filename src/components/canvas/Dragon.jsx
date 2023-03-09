import * as THREE from 'three'
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import React, { Suspense,useRef, useEffect, useState } from 'react'
import { Canvas ,extend, useThree, useFrame} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'




function Hardware() {
  const [scene, set] = useState()
  useEffect(() => {
  new GLTFLoader().load("./phoenix_bird/scene.gltf", gltf => {
    set(gltf.scene)
    const mixer = new THREE.AnimationMixer(gltf.scene)
    gltf.animations.forEach(clip => mixer.clipAction(clip).play())
  })
}, [])

return scene ? <primitive object={scene} scale={0.005} position={[0,0.2,-1]}/> : null

}

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (

    <OrbitControls
      autoRotate
      maxPolarAngle={Math.PI /2}
      minPolarAngle={Math.PI /2 }
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}
const animated_element = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Controls/>
      <Suspense fallback={null}>
        <Hardware/>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default animated_element;