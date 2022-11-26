import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.roomScene = this.room.scene;

    this.setModel();
    this.setAnimation();
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
        fishTankFolder.open();
      }

      if (child.name === "Monitor_Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
        child.scale.y = child.scale.y * -1;
      }
    });

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

  resize() {}

  update() {
    this.mixer.update(this.time.delta * 0.0009);
  }
}
