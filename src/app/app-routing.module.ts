import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/list", pathMatch: "full" },
    { path: "list", loadChildren: "~/app/list/list.module#listModule" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" }
   
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
