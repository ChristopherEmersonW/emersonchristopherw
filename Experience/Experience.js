import * as THREE from "three";

// utils
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Resources from "./utils/Resources";
import Theme from "./utils/Theme";

import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/world";
import Controls from "./world/Controls";

import assets from "./utils/assets";

export default class Experience {
  static instance;

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.controls = new Controls();

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();

    if (this.controls) {
      this.controls.update();
    }
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }
}
