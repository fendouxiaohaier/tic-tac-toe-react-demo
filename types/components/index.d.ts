export { default as Board } from "./Board/index";
export { default as Square } from "./Square/index";
export { default as Game } from "./Game/index";

declare module "./components" {
  import { default as Game } from "./Game/index";
  export { Game };
}
