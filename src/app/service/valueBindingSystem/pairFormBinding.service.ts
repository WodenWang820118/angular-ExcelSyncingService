import { Injectable } from "@angular/core";
import { ValueBindingService } from "./valueBinding.service";

@Injectable({providedIn: 'root'})
export class PairFormBindingService extends ValueBindingService {
  constructor() {
    super();
  }
}