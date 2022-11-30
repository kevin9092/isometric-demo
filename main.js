import "./style.css";
import Experience from "./Experience/Experience";
import { inject } from "@vercel/analytics";

const experience = new Experience(document.querySelector(".experience-canvas"));

inject();
