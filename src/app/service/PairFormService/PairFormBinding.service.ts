import { Injectable } from "@angular/core";
import { ValueBindingService } from "../ValueBinding.service";

@Injectable({providedIn: 'root'})
export class PairFormBindingService extends ValueBindingService {
  constructor() {
    super();
  }
}