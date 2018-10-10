import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

import { listRoutingModule } from "./list-routing.module";
import { listComponent } from "./list.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIChartModule,
        listRoutingModule
    ],
    declarations: [
        listComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class listModule { }