import { Board } from "../components/Board/index";
import { Square } from "../components/Square/index";
import { Game } from "../components/Game/index";

declare module "components" {
  export { Board, Square, Game };
}

// declare module "*.png" {
//   const url: string;
//   export default url;
// }
