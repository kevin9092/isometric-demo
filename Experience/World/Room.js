import * as THREE from "three";
import { RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import GSAP from "gsap";
import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.roomScene = this.room.scene;

    this.rotation = 0;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.roomScene.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;

          if (child instanceof THREE.Group) {
            child.children.forEach((groupChild) => {
              groupChild.castShadow = true;
              groupChild.receiveShadow = true;
            });
          }
        });
      }

      if (child.name === "Fish_Tank_Glass") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x549dd2);
        child.material.ior = 4;
        child.material.transmission = 0.9;
        child.material.opacity = 1;

        // GUI Controls
        if (this.experience.gui === undefined) return;
        const fishTankFolder = this.experience.gui.addFolder("FishTank");
        fishTankFolder.add(child.material, "roughness", 0, 1);
        fishTankFolder.add(child.material, "ior", 0, 10);
        fishTankFolder.add(child.material, "transmission", 0, 1);
      }

      if (child.name === "Monitor_Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
        child.scale.y = child.scale.y * -1;
      }
    });

    const width = 0.3;
    const height = 0.7;
    const intensity = 3;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(11.396622657775879, 11, -3.5455992698669434);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.roomScene.rectLight = rectLight;

    this.roomScene.add(rectLight);

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    //rectLight.add(rectLightHelper);

    this.scene.add(this.roomScene);
    this.roomScene.scale.set(0.11, 0.11, 0.11);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.roomScene);
    this.fishAnimation = this.mixer.clipAction(
      this.room.animations.find((x) => x.name === "FishAction")
    );
    this.fishAnimation.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.roomScene.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta * 0.0009);
  }
}
