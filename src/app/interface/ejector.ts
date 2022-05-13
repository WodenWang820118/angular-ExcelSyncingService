import { FormControl } from "@angular/forms";
import { PairForm } from "./pairForm";

interface EjectorParams {
  "velocity": PairForm,
  "pressure": PairForm,
  "position": PairForm
}

export interface EjectorForm {
  "section": FormControl,
  "form": EjectorParams
}
