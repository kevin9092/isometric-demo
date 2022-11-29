import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.roomScene = this.experience.world.room.roomScene;
    this.rectLight = this.roomScene.rectLight;

    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        this.roomScene.scale.set(0.11, 0.11, 0.11);
        this.camera.orthographicCamera.position.set(0, 4, 5);
        this.roomScene.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.rectLight.height = 0.7;

        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.fromTo(
          this.roomScene.position,
          { x: 0, y: 0, z: 0 },
          {
            x: () => {
              return this.sizes.width * 0.002;
            },
          }
        );

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.fromTo(
          this.roomScene.position,
          {},
          {
            x: 1,
            z: () => {
              return this.sizes.height * 0.0032;
            },
          },
          "step2"
        );
        this.secondMoveTimeline.to(
          this.roomScene.scale,
          {
            x: 0.4,
            y: 0.4,
            z: 0.4,
          },
          "step2"
        );
        this.secondMoveTimeline.to(
          this.rectLight,
          {
            width: 0.3 * 4,
            height: 0.7 * 4,
          },
          "step2"
        );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
          y: -2,
          x: -5,
        });
      },

      //Mobile
      "(max-width: 968px)": () => {
        this.roomScene.scale.set(0.07, 0.07, 0.07);
        this.camera.orthographicCamera.position.set(0, 4, 5);
        this.roomScene.position.set(0, 0, 0);
        this.rectLight.width = 0.2;
        this.rectLight.height = 0.5;

        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.roomScene.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.fromTo(
          this.roomScene.position,
          { x: 0, z: 0 },
          {
            x: 5,
            z: () => {
              return this.sizes.height * 0.0032;
            },
          },
          "step2m"
        );
        this.secondMoveTimeline.fromTo(
          this.roomScene.scale,
          {},
          {
            x: 0.4,
            y: 0.4,
            z: 0.4,
          },
          "step2m"
        );
        this.secondMoveTimeline.to(
          this.rectLight,
          {
            width: 0.2 * 4,
            height: 0.5 * 4,
          },
          "step2m"
        );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
          y: 5,
          x: 9,
        });
      },
      all: () => {},
    });
  }

  resize() {}

  update() {}
}
