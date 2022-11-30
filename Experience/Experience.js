import * as THREE from "three";
import { GUI } from "dat-gui";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Theme from "./Theme";
import Renderer from "./Renderer";

import World from "./World/World";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    // this.gui = new GUI();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();

    const fullScreen = document.querySelector(".fullscreen");
    fullScreen.addEventListener("click", () => {
      document.documentElement.requestFullscreen();
      fullScreen.classList.toggle("hidden");
      fullScreenClose.classList.toggle("hidden");
    });

    const fullScreenClose = document.querySelector(".fullscreen-close");
    fullScreenClose.addEventListener("click", () => {
      document.exitFullscreen();
      fullScreenClose.classList.toggle("hidden");
      fullScreen.classList.toggle("hidden");
    });

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
