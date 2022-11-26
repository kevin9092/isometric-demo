import * as THREE from "three";
import { Scene } from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 30;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-8, 16, 20);
    this.scene.add(this.sunLight);

    // Light Helper
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    // GUI Controls
    if (this.experience.gui === undefined) return;
    const sunLightFolder = this.experience.gui.addFolder("SunLight");
    sunLightFolder.add(this.sunLight.position, "x", -30, 30);
    sunLightFolder.add(this.sunLight.position, "y", -30, 30);
    sunLightFolder.add(this.sunLight.position, "z", -30, 30);

    const ambientLightFolder = this.experience.gui.addFolder("AmbientLight");
    ambientLightFolder.add(this.ambientLight, "intensity", 0, 10);
  }

  resize() {}

  update() {}
}
