import { ValueBindingService } from "./valueBinding.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EjectorValueBindingService extends ValueBindingService {
  constructor() {
    super();
  }
}