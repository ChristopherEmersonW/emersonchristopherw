import * as THREE from "three";
import gsap from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

import Experience from "../Experience";
import { PointLightHelper } from "three";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
    this.screenLight();
    // this.lampLight();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((grandChild) => {
          grandChild.castShadow = true;
          grandChild.receiveShadow = true;
        });
      }

      // lamp
      // if (child.name === "Plane002") {
      //   console.log(child);
      // }

      // console.log(child);

      // adding video to the monitor
      if (child.name === "monitor_pillow") {
        // console.log(child);
        child.children[2].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "minifloor") {
        child.position.x = -7.14954;
        child.position.z = 14.2664;
      }

      if (
        child.name === "mailbox" ||
        child.name === "minifloor_lamp" ||
        child.name === "minifloor_mat1" ||
        child.name === "minifloor_mat2" ||
        child.name === "minifloor_mat3" ||
        child.name === "soil" ||
        child.name === "grass_1" ||
        child.name === "grass_2"
      ) {
        child.scale.set(0, 0, 0);
      }
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.1, 0.1, 0.1);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.14;
    });
  }

  screenLight() {
    // area lighting for dark mode
    const width = 0.3;
    const height = 0.3;
    const intensity = 2;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );

    rectLight.position.set(
      -10.736467361450195,
      7.201098918914795,
      -1.4090909957885742
    );
    this.actualRoom.add(rectLight);
    rectLight.rotateY(-Math.PI / 1.2);

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);
  }

  lampLight() {
    const width = 0.2;
    const height = 0.2;
    const intensity = 0.5;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );

    rectLight.position.set(
      -7.273387432098389,
      0.317962646484375,
      12.20819091796875
    );
    this.actualRoom.add(rectLight);
    rectLight.rotateY(-Math.PI / 1.2);
  }

  resize() {}

  // for orbit controls
  update() {
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    // intial rotation-animation on mouseMove
    this.actualRoom.rotation.y = this.lerp.current;
  }
}
