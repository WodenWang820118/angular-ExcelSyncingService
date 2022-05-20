import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjectorLayoutComponent } from './components/ejector-layout/ejector-layout.component';
import { FormsLayoutComponent } from './components/forms-layout/forms-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'ejector', pathMatch: 'full' },
  { path: 'ejector', component: EjectorLayoutComponent },
  { path: 'forms', component: FormsLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
