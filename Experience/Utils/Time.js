import { EventEmitter } from "events";
import Stats from "stats.js";

import Experience from "../Experience";

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.experience = new Experience();

    // Stats
    this.stats = new Stats();
    this.stats.showPanel(1);
    this.stats.domElement.height = "48px";
    [].forEach.call(
      this.stats.domElement.children,
      (child) => (child.style.display = "")
    );
    // GUI Controls
    if (this.experience.gui !== undefined) {
      const perfFolder = this.experience.gui.addFolder("Performance Stats");
      const perfLi = document.createElement("li");
      this.stats.domElement.style.position = "static";
      perfLi.appendChild(this.stats.domElement);
      perfLi.classList.add("gui-stats");
      perfFolder.__ul.appendChild(perfLi);
    }
    // document.body.appendChild(this.stats.dom);

    this.update();
  }

  update() {
    const currentTime = Date.now();

    this.stats.begin();

    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.stats.end();

    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
