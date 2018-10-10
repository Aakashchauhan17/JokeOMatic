import { Component, NgZone,ChangeDetectionStrategy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

import {
    MLKitImageLabelingCloudResult,
    MLKitImageLabelingOnDeviceResult
  } from "nativescript-plugin-firebase/mlkit/imagelabeling";

  const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 
    
    constructor(private _routerExtensions: RouterExtensions) {
         }
    
 }
