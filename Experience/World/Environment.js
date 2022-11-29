import * as THREE from "three";
import { Scene } from "three";
import GSAP from "gsap";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
    this.setGUI();
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
    this.helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    this.helper.visible = false;
    this.scene.add(this.helper);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientLight);
  }

  setGUI() {
    // GUI Controls
    if (this.experience.gui === undefined) return;
    const sunLightFolder = this.experience.gui.addFolder("SunLight");
    sunLightFolder.add(this.helper, "visible", false, true);
    sunLightFolder.add(this.sunLight.position, "x", -30, 30);
    sunLightFolder.add(this.sunLight.position, "y", -30, 30);
    sunLightFolder.add(this.sunLight.position, "z", -30, 30);
    sunLightFolder.add(this.sunLight, "intensity", 0, 10);

    this.colorObj = {
      color: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };
    sunLightFolder.addColor(this.colorObj, "color").onChange(() => {
      this.sunLight.color.r = this.colorObj.color.r / 255;
      this.sunLight.color.g = this.colorObj.color.g / 255;
      this.sunLight.color.b = this.colorObj.color.b / 255;

      this.ambientLight.color.r = this.colorObj.color.r / 255;
      this.ambientLight.color.g = this.colorObj.color.g / 255;
      this.ambientLight.color.b = this.colorObj.color.b / 255;
    });

    const ambientLightFolder = this.experience.gui.addFolder("AmbientLight");
    ambientLightFolder.add(this.ambientLight, "intensity", 0, 10);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunLight, { intensity: 0.78 });
      GSAP.to(this.ambientLight, { intensity: 0.78 });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, { intensity: 3 });
      GSAP.to(this.ambientLight, { intensity: 1 });
    }
  }

  resize() {}

  update() {}
}
