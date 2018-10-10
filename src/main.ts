// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";
const firebase = require("nativescript-plugin-firebase");
firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
  }).then(
    instance => {
      console.log("firebase.init done");
    },
    error => {
      console.log(`firebase.init error: ${error}`);
    }
  );


platformNativeScriptDynamic().bootstrapModule(AppModule);
