import * as THREE from "three";

import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // console.log(this.sizes, this.scene, this.canvas);

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 26;
    this.perspectiveCamera.position.y = 15;
    this.perspectiveCamera.position.z = 16;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    // positioning the camera
    // this.orthographicCamera.position.x = 4;
    this.orthographicCamera.position.y = 4;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // ortho camera helper
    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    // helpers
    // const size = 20;
    // const divisions = 20;

    // adding grid helper
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // adding axis helper
    // const axesHelper = new THREE.AxesHelper(size);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false; // false temporarily
  }

  resize() {
    // perspective camera update
    this.perspectiveCamera.aspect = this.sizes.aspect;

    // orthographic camera update
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    // this.orthographicCamera.updateProjectionMatrix();
  }

  // for orbit controls
  update() {
    this.controls.update();
    // console.log(this.perspectiveCamera.position);

    // ortho camera helper
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
