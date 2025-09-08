import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { div } from 'three/tsl';




function Scene() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const vShader = `
    uniform float time;
    varying vec3 vPos;

    void main() {
    vPos = position;

    vec3 newPosition = position;

    // newPosition.z += 0.3 * sin(position.x * 4.0 + time * 2.0);
    // newPosition.y += 0.2 * sin(position.y * 3.0 + time);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
    `;

    const fShader = `
    uniform float time;
    varying vec3 vPos;

    void main() {
    float wrap = sin(vPos.x * 5.0 + time) * 0.5;
    vec3 color = 0.5 + 0.5 * cos(vPos * 0.5 + vec3(1.8 + time, 3.4 + time, 0.3 + time + 13.0));
    gl_FragColor = vec4(color, 1.0);
    }
    `;


    const geometry = new THREE.IcosahedronGeometry(); // Use detail=0 for true flat faces
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.1 }
      },
      vertexShader: vShader,
      fragmentShader: fShader,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh);

    // const wireMat = new THREE.MeshBasicMaterial({
    //   color: 'black',
    //   wireframe: true,
    //   antialias: true,
    //   opacity: .2,
    //   transparent: true
    // })
    // const wireMesh = new THREE.Mesh(geometry, wireMat);
    // mesh.add(wireMesh)

    camera.position.z = 2;

    const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
    DirectionalLight.position.set(1, 1, 1);
    scene.add(DirectionalLight);

    const canvas = document.querySelector('canvas')
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true;
    controls.dampingFactor = 0.025;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    })

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      material.uniforms.time.value = clock.getElapsedTime();
      console.log(material.uniforms.time.value)
      renderer.render(scene, camera);
      mesh.rotation.y += 0.002
      controls.update();
    }
    animate();

  })
  return (
    <div>
        <canvas className='absolute top-0'></canvas>
    </div>
  )
}

export default Scene;