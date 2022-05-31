import { Coordinate } from "../class/Coordinate"

export interface PairForm {
  id: string,
  label: string,
  cell: string,
  coordinate: Coordinate,
  value: number
}