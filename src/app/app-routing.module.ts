import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AplicacionComponent } from "./Components/aplicacion/aplicacion.component";

const routes: Routes = [
  { path: "", redirectTo: "/aplicacion", pathMatch: "full" },
  { path: "aplicacion", component: AplicacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], //Produccion
  //imports: [RouterModule.forRoot(routes)], //local
  exports: [RouterModule]
})
export class AppRoutingModule {}
