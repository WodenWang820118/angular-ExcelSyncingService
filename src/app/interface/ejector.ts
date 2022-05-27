import { Coordinate } from "../class/Coordinate";
import { PairForm } from "./pairForm";

interface EjectorParams {
  "velocity": PairForm,
  "pressure": PairForm,
  "position": PairForm
}

export interface EjectorForm {
  "id": string,
  "section": number,
  "label": string,
  "cell": string,
  "coordinate": Coordinate,
  "value": number
}