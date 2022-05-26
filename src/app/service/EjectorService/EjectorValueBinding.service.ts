import { ValueBindingService } from "../ValueBinding.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EjectorValueBindingService extends ValueBindingService {
  constructor() {
    super();
  }
}