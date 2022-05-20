import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { SettingComponent } from './components/setting/setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsComponent } from './components/forms/forms.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { EjectorComponent } from './components/ejector/ejector.component';
import { EjectorSettingComponent } from './components/ejector-setting/ejector-setting.component';
import { EjectorPanelComponent } from './components/ejector-panel/ejector-panel.component';
import { EjectorLayoutComponent } from './components/ejector-layout/ejector-layout.component';
import { FormsLayoutComponent } from './components/forms-layout/forms-layout.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    SettingComponent,
    FormsComponent,
    EjectorComponent,
    EjectorSettingComponent,
    EjectorPanelComponent,
    EjectorLayoutComponent,
    FormsLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    HttpClientModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
