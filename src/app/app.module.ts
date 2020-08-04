import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SafePipe } from './Pipes/safe.pipe';
import { AplicacionComponent } from './Components/aplicacion/aplicacion.component';

@NgModule({
  declarations: [AppComponent, SafePipe, AplicacionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
