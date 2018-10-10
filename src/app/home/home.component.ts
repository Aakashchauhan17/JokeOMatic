import { Component, OnInit, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { action } from "tns-core-modules/ui/dialogs";
import { fromFile, ImageSource } from "tns-core-modules/image-source";
import * as myGlobals from "~/app/globals"
import { isIOS } from "tns-core-modules/platform";
import { Progress } from "ui/progress";
import { Kinvey , CacheStore } from 'kinvey-nativescript-sdk';
import * as Camera from "nativescript-camera";
import * as ImagePicker from "nativescript-imagepicker";
import { alert } from "ui/dialogs";
import {
    MLKitImageLabelingCloudResult,
    MLKitImageLabelingOnDeviceResult
  } from "nativescript-plugin-firebase/mlkit/imagelabeling";
  import { ImageAsset } from "tns-core-modules/image-asset";

  const firebase = require("nativescript-plugin-firebase");
  interface list {
    _id;
    jnum:string;
    percentage: number;
}
  
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
 dataStore: CacheStore<list>;
  public confidence: number;
  public progressValue: number;
    pickedImage: ImageSource;
    private mlkitFeatures: Array<string> = [
        "Image labeling",
      ];

      private mlkitOnDeviceFeatures: Array<string> = [
        "Image labeling"
      ];

    constructor(private routerExtensions: RouterExtensions,
        private zone: NgZone) {
          this.dataStore = Kinvey.DataStore.collection<list>('faceCollection');
    }
    fromCameraPicture(): void {
        if (!isIOS) {
          Camera.requestPermissions();
        }
        Camera.takePicture({
          width: 800,
          height: 800,
          keepAspectRatio: true,
          saveToGallery: true,
          cameraFacing: "rear"
        }).then(imageAsset => {
          new ImageSource().fromAsset(imageAsset).then(imageSource => {
            this.pickedImage = imageSource;
            // Timeout
            setTimeout(() => this.selectMLKitFeature(imageSource), 500);
          });
        });
    }
    fromCameraroll(): void {
        const imagePicker = ImagePicker.create({
          mode: "single"
        });
    
        imagePicker
            .authorize()
            .then(() => imagePicker.present())
            .then((selection: Array<ImageAsset>) => {
              if (selection.length === 0) return;
    
              const selected = selection[0];
              selected.options.height = 800;
              selected.options.width = 800;
              selected.options.keepAspectRatio = true;
              selected.getImageAsync((image: any, error: any) => {
                if (error) {
                  console.log(`Error getting image: ${error}`);
                  return;
                }
                if (!image) {
                  alert({
                    title: `Invalid image`,
                    message: `Invalid`,
                    okButtonText: "Ok."
                  });
                  return;
                }
                const imageSource = new ImageSource();
                imageSource.setNativeSource(image);
                this.zone.run(() => {
                  this.pickedImage = imageSource;
                });
                // Timeout
                setTimeout(() => this.selectMLKitFeature(imageSource), 500);
              });
            })
            .catch(e => {
              console.log(`Image Picker error: ${e}`);
            });
      }
      reusePickedImage(): void {
        if (this.pickedImage) {
          this.selectMLKitFeature(this.pickedImage);
        }
      }
    private selectMLKitFeature(imageSource: ImageSource): void {
        action(
            "What you wanna do?",
            "Cancel",
            this.mlkitFeatures
        ).then((pickedItem: string) => {
          let pickedItemIndex = this.mlkitFeatures.indexOf(pickedItem);
           if (pickedItem === "Image labeling") {
            this.labelImageOnDevice(imageSource);
            }
        });
      }
      private labelImageOnDevice(imageSource: ImageSource): void {
        firebase.mlkit.imagelabeling.labelImageOnDevice({
          image: imageSource,
          confidenceThreshold: 0.3
        }).then(
            (result: MLKitImageLabelingOnDeviceResult) => {
              alert({
                title: `Result`,
                message: JSON.stringify(result.labels),
                okButtonText: "OK"
              }).then(() => {
                this.progressValue = this.confidence;
                // console.log(JSON.stringify(result.labels));
              let model = this;
              result.labels.forEach(function(label){
                    if(label.text === 'Smile')
                      model.confidence=label.confidence;
                    
              });
              console.log(this.confidence);
              console.log("You have index here---------->" +myGlobals.UrlComponent.urlArray);
              const entity = {_id:null, jnum:myGlobals.UrlComponent.urlArray,percentage:this.confidence};
              const promise = this.dataStore.save(entity)
                .then((entity: {}) => {
                  // ...
                })
                .catch((error: Kinvey.BaseError) => {
                  // ...
                });
                const promise1 = this.dataStore.sync()
              .then(() => {
              
              })
            });
          })
            .catch(errorMessage => console.log("ML Kit error: " + errorMessage));
         
      }
     onProgressBarLoaded(args){
        let myProgressBar = <Progress>args.object;
        myProgressBar.value = this.progressValue;
      }
      onValueChanged(args) {
        let progressBar = <Progress>args.object;

        console.log("Value changed for " + progressBar);
        console.log("New value: " + progressBar.value);
    }


ngOnInit(): void {
  let abc = this.dataStore.pull();
 // console.log(abc);
        
    }
}
