import * as THREE from "three";
import gsap from "gsap";

import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({ color: "#ffffff" });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotateX(-Math.PI / 2);
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material1 = new THREE.MeshStandardMaterial({ color: "#7fc6d9" });
    const material2 = new THREE.MeshStandardMaterial({ color: "#8395cd" });
    const material3 = new THREE.MeshStandardMaterial({ color: "#8395cd" });
    const material4 = new THREE.MeshStandardMaterial({ color: "#7ad0ac" });

    this.circle1 = new THREE.Mesh(geometry, material1);
    this.circle2 = new THREE.Mesh(geometry, material2);
    this.circle3 = new THREE.Mesh(geometry, material3);
    this.circle4 = new THREE.Mesh(geometry, material4);

    this.circle1.position.y = -0.29;
    this.circle2.position.y = -0.28;
    this.circle2.position.x = 1;
    this.circle3.position.y = -0.27;
    this.circle4.position.y = -0.26;

    this.circle1.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);
    this.circle4.scale.set(0, 0, 0);

    this.circle1.rotation.x =
      this.circle2.rotation.x =
      this.circle3.rotation.x =
      this.circle4.rotation.x =
        -Math.PI / 2;

    this.circle1.receiveShadow =
      this.circle2.receiveShadow =
      this.circle3.receiveShadow =
      this.circle4.receiveShadow =
        true;

    this.scene.add(this.circle1);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
    this.scene.add(this.circle4);
  }

  resize() {}

  update() {}
}
