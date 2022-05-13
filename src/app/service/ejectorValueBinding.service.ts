import { ValueBindingService } from "./valueBinding.service";
import { ejectSections, ejectorParams } from "./ejector";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EjectorValueBindingService extends ValueBindingService {
  constructor() {
    super();
  }

  getEjectSections(): number[] {
    return ejectSections;
  }

  getEjectorParams(): string[] {
    return ejectorParams;
  }
}