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
    camera.position.set(0, 0, 24);

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

    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(245, 225, 185, 0.9)');
        gradient.addColorStop(0.5, 'rgba(216, 173, 112, 0.35)');
        gradient.addColorStop(0.85, 'rgba(160, 110, 50, 0.08)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    const bokehCount = window.innerWidth < 768 ? 28 : 50;
    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);
    const bokehScales = new Float32Array(bokehCount);

    const bokehPalette = [
      new THREE.Color('#fff6e6'),
      new THREE.Color('#f5e1b8'),
      new THREE.Color('#e6c285'),
      new THREE.Color('#d8ad70'),
      new THREE.Color('#b88647'),
      new THREE.Color('#ffd194'),
    ];

    const bokehData: {
      baseX: number;
      baseY: number;
      baseZ: number;
      speedY: number;
      swaySpeed: number;
      swayRadius: number;
      swayOffset: number;
      boundsY: number;
    }[] = [];

    for (let i = 0; i < bokehCount; i++) {
      const i3 = i * 3;
      let x = (Math.random() - 0.5) * 40;
      let y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 22;

      if (Math.abs(x) < 6 && Math.abs(y) < 7) {
        x += (x >= 0 ? 1 : -1) * (7 + Math.random() * 8);
      }

      bokehPositions[i3] = x;
      bokehPositions[i3 + 1] = y;
      bokehPositions[i3 + 2] = z;

      const c = bokehPalette[Math.floor(Math.random() * bokehPalette.length)];
      bokehColors[i3] = c.r;
      bokehColors[i3 + 1] = c.g;
      bokehColors[i3 + 2] = c.b;

      bokehScales[i] = 0.8 + Math.random() * 1.6;

      bokehData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        speedY: 0.2 + Math.random() * 0.45,
        swaySpeed: 0.6 + Math.random() * 1.2,
        swayRadius: 0.4 + Math.random() * 1.0,
        swayOffset: Math.random() * Math.PI * 2,
        boundsY: 18,
      });
    }

    bokehGeometry.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeometry.setAttribute('color', new THREE.BufferAttribute(bokehColors, 3));

    const bokehMaterial = new THREE.PointsMaterial({
      size: 1.4,
      sizeAttenuation: true,
      map: glowTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bokehPoints = new THREE.Points(bokehGeometry, bokehMaterial);
    mainGroup.add(bokehPoints);

    const dustCount = window.innerWidth < 768 ? 450 : 900;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const dustPalette = [
      new THREE.Color('#fff9ed'),
      new THREE.Color('#f5dfb8'),
      new THREE.Color('#e0b878'),
      new THREE.Color('#c99852'),
      new THREE.Color('#ffdca8'),
    ];

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      let x = (Math.random() - 0.5) * 55;
      let y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 40;

      if (Math.abs(x) < 5 && Math.abs(y) < 6) {
        x += (x >= 0 ? 1 : -1) * 7;
      }

      dustPositions[i3] = x;
      dustPositions[i3 + 1] = y;
      dustPositions[i3 + 2] = z;

      const c = dustPalette[Math.floor(Math.random() * dustPalette.length)];
      dustColors[i3] = c.r;
      dustColors[i3 + 1] = c.g;
      dustColors[i3 + 2] = c.b;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.35,
      sizeAttenuation: true,
      map: glowTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    mainGroup.add(dustPoints);

    const celestialRingGeo = new THREE.TorusGeometry(15, 0.025, 16, 120);
    const celestialRingMat = new THREE.MeshBasicMaterial({
      color: 0xd8ad70,
      transparent: true,
      opacity: 0.22,
    });
    const celestialRing = new THREE.Mesh(celestialRingGeo, celestialRingMat);
    celestialRing.rotation.x = Math.PI * 0.38;
    celestialRing.rotation.y = Math.PI * 0.15;
    mainGroup.add(celestialRing);

    const celestialRingGeo2 = new THREE.TorusGeometry(18, 0.015, 16, 120);
    const celestialRingMat2 = new THREE.MeshBasicMaterial({
      color: 0xf2d7a8,
      transparent: true,
      opacity: 0.14,
    });
    const celestialRing2 = new THREE.Mesh(celestialRingGeo2, celestialRingMat2);
    celestialRing2.rotation.x = -Math.PI * 0.32;
    celestialRing2.rotation.z = Math.PI * 0.2;
    mainGroup.add(celestialRing2);

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

      targetCameraX = normX * 4.0;
      targetCameraY = -normY * 3.0;

      targetRotationY = normX * 0.18;
      targetRotationX = normY * 0.14;
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

      camera.position.x += (targetCameraX - camera.position.x) * 0.045;
      camera.position.y += (targetCameraY - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.035 + 0.0004;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.035;

      celestialRing.rotation.z = elapsed * 0.015;
      celestialRing2.rotation.z = -elapsed * 0.012;

      const posArray = bokehGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < bokehCount; i++) {
        const item = bokehData[i];
        const i3 = i * 3;

        let curY = posArray[i3 + 1] + item.speedY * 0.025;
        if (curY > item.boundsY) {
          curY = -item.boundsY;
        }
        posArray[i3 + 1] = curY;

        posArray[i3] = item.baseX + Math.sin(elapsed * item.swaySpeed + item.swayOffset) * item.swayRadius;
      }
      bokehGeometry.attributes.position.needsUpdate = true;

      dustPoints.rotation.y = elapsed * 0.008;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', handleResize);

      bokehGeometry.dispose();
      bokehMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      celestialRingGeo.dispose();
      celestialRingMat.dispose();
      celestialRingGeo2.dispose();
      celestialRingMat2.dispose();
      glowTexture.dispose();
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
