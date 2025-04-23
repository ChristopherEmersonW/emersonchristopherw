import * as THREE from "three";
import gsap from "gsap";

import GUI from "lil-gui";

import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };
    this.setSunlight();
    // this.setGUI();
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 2);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(-1.75, 7.5, 3);
    this.scene.add(this.sunlight);

    //   adding ambient light
    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    this.scene.add(this.ambientLight);
  }

  // setGUI() {
  //   this.gui.addColor(this.obj, "colorObj").onChange(() => {
  //     this.sunlight.color.copy(this.obj.colorObj);
  //     this.ambientLight.color.copy(this.obj.colorObj);
  //     console.log(this.obj.colorObj);
  //   });

  //   this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
  //     this.sunlight.intensity = this.obj.intensity;
  //     this.ambientLight.intensity = this.obj.intensity;
  //   });
  // }

  switchTheme(theme) {
    if (theme === "light") {
      gsap.to(this.sunlight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      gsap.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });

      gsap.to(this.sunlight, { intensity: 2 });
      gsap.to(this.ambientLight, { intensity: 0.5 });
    } else {
      gsap.to(this.sunlight.color, {
        r: 0.28627450980392155,
        g: 0.18823529411764706,
        b: 0.7725490196078432,
      });
      gsap.to(this.ambientLight.color, {
        r: 0.28627450980392155,
        g: 0.18823529411764706,
        b: 0.7725490196078432,
      });

      gsap.to(this.sunlight, { intensity: 0.8 });
      gsap.to(this.ambientLight, { intensity: 1 });
    }
  }

  resize() {}

  // for orbit controls
  update() {}
}
