'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 2, 60);
    pointLight.position.set(12, 10, 15);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa855f7, 1.8, 60);
    pointLight2.position.set(-14, -8, 10);
    scene.add(pointLight2);

    const cubeColors = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#0284c7'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#2563eb'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#d8ad70'),
      new THREE.Color('#ffffff'),
    ];

    const cubeCount = window.innerWidth < 768 ? 32 : 65;
    const boxGeometry = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const boxMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    const instancedCubes = new THREE.InstancedMesh(boxGeometry, boxMaterial, cubeCount);
    instancedCubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    const cubeData: {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      speedRotX: number;
      speedRotY: number;
      floatSpeed: number;
      floatOffset: number;
      scale: number;
    }[] = [];

    for (let i = 0; i < cubeCount; i++) {
      let x = (Math.random() - 0.5) * 44;
      let y = (Math.random() - 0.5) * 32;
      const z = (Math.random() - 0.5) * 30;

      if (Math.abs(x) < 7 && Math.abs(y) < 8) {
        x += (x >= 0 ? 1 : -1) * (8 + Math.random() * 8);
      }

      const scale = 0.5 + Math.random() * 0.9;
      const rotX = Math.random() * Math.PI * 2;
      const rotY = Math.random() * Math.PI * 2;
      const rotZ = Math.random() * Math.PI * 2;

      cubeData.push({
        x,
        y,
        z,
        rotX,
        rotY,
        rotZ,
        speedRotX: (Math.random() - 0.5) * 0.012,
        speedRotY: (Math.random() - 0.5) * 0.012,
        floatSpeed: 0.4 + Math.random() * 0.9,
        floatOffset: Math.random() * Math.PI * 2,
        scale,
      });

      const color = cubeColors[Math.floor(Math.random() * cubeColors.length)];
      instancedCubes.setColorAt(i, color);
    }

    if (instancedCubes.instanceColor) {
      instancedCubes.instanceColor.needsUpdate = true;
    }
    mainGroup.add(instancedCubes);

    const ringGeometry1 = new THREE.TorusGeometry(3.0, 0.05, 16, 80);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ring1.position.set(14, 3, -6);
    ring1.rotation.x = 1.1;
    ring1.rotation.y = 0.5;
    mainGroup.add(ring1);

    const ringGeometry2 = new THREE.TorusGeometry(3.6, 0.04, 16, 80);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.position.set(-15, -6, -12);
    ring2.rotation.x = 0.8;
    ring2.rotation.y = -0.4;
    mainGroup.add(ring2);

    const dustCount = window.innerWidth < 768 ? 120 : 280;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const palette = [
      new THREE.Color('#38bdf8'),
      new THREE.Color('#00d4ff'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#f2d7a8'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      let x = (Math.random() - 0.5) * 55;
      let y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;

      if (Math.abs(x) < 5 && Math.abs(y) < 6) {
        x += (x >= 0 ? 1 : -1) * 7;
      }

      dustPositions[i3] = x;
      dustPositions[i3 + 1] = y;
      dustPositions[i3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      dustColors[i3] = c.r;
      dustColors[i3 + 1] = c.g;
      dustColors[i3 + 2] = c.b;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    mainGroup.add(dustPoints);

    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const normX = (clientX / window.innerWidth - 0.5) * 2;
      const normY = (clientY / window.innerHeight - 0.5) * 2;

      targetCameraX = normX * 4.5;
      targetCameraY = -normY * 3.5;

      targetRotationY = normX * 0.22;
      targetRotationX = normY * 0.18;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.04 + 0.0006;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.04;

      ring1.rotation.x += 0.005;
      ring1.rotation.y += 0.007;

      ring2.rotation.x += 0.004;
      ring2.rotation.z += 0.005;

      for (let i = 0; i < cubeCount; i++) {
        const item = cubeData[i];
        item.rotX += item.speedRotX;
        item.rotY += item.speedRotY;

        const currentY = item.y + Math.sin(elapsed * item.floatSpeed + item.floatOffset) * 0.35;

        dummy.position.set(item.x, currentY, item.z);
        dummy.rotation.set(item.rotX, item.rotY, item.rotZ);
        dummy.scale.set(item.scale, item.scale, item.scale);
        dummy.updateMatrix();

        instancedCubes.setMatrixAt(i, dummy.matrix);
      }
      instancedCubes.instanceMatrix.needsUpdate = true;

      dustPoints.rotation.y = elapsed * 0.012;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', handleResize);

      boxGeometry.dispose();
      boxMaterial.dispose();
      ringGeometry1.dispose();
      ringMaterial1.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
