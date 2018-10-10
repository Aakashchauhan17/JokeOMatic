import { Component, OnInit, NgZone, ChangeDetectionStrategy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as myGlobals from "~/app/globals";
import { TrackballCustomContentData } from 'nativescript-ui-chart';
import { Kinvey , CacheStore } from 'kinvey-nativescript-sdk';
Kinvey.init({
    appKey: "kid_SyL77arwm",
    appSecret: "78eaf119f560492f956693cdee35e39c",
});
interface list1 {
    _id;
    jnum:string;
    percentage: string;
}
class joke {
    constructor (public name: string){}
}
class jdata{
    constructor(public jnum?: number, public average?: number, public count?: number) {
    }
}

  let myjokes = ["Don't you hate it when someone answers their own questions? I do.",
  "Plan ahead - It wasn't raining when Noah built the ark.",
  "Behind every angry woman is a man who has absolutely no idea what he did wrong.",
  "Maybe if we start telling people the brain is an app they will start using it.",
  "That one liner 'i'm not drinking too much tonight' never goes as planned...",
  "I just asked my husband if he remembers what today is... Scaring men is easy.",
  "It is easier to preach ten sermons than it is to live one.",
  "I like using misdirection in my jokes, or do I?",
  "Plan ahead - It wasn't raining when Noah built the ark.",
  "I grew a beard thinking it would say 'Distinguished Gentleman.' Instead, turns out it says, 'Senior Discount, Please!'",
  "My email password has been hacked. That's the third time I've had to rename the cat.",
  "Photons have mass? I didn't even know they were Catholic.",
  "The dinner I was cooking for my family was going to be a surprise but the fire trucks ruined it.",
  "What did the blonde say when she saw Cheerios? Donut seeds.",
  "Moses had the first tablet that could connect to the cloud.",
  "The first computer dates back to Adam and Eve. It was an Apple with limited memory, just one byte. And then everything crashed.",
  "Alcohol is a perfect solvent: It dissolves marriages, families and careers.",
  "A doctor tells a woman she can no longer touch anything alcoholic. So she gets a divorce.",
  "Talking to a liberal is like trying to explain social media to a 70 years old.",
  "If God is your co-pilot - swap seats.",
  "Ham and Eggs: A day's work for a chicken, a lifetime commitment for a pig.",
  "Before I tell my wife something important, I take both her hands in mine. That way she can't hit me with them.",
  "Math Teacher: 'If I have 5 bottles in one hand and 6 in the other hand, what do I have?' Student: 'A drinking problem.'",
  "Never trust a dog to watch your food.",
  "I hate when I'm running on the treadmill for half an hour and look down to see it's been 4 minutes."]
@Component({
    selector: "list",
    moduleId: module.id,
    templateUrl: "./list.component.html",
    styleUrls: ['./list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class listComponent implements OnInit{
   public dataStore: CacheStore<list1>;
   public myjokes: {};
    public myItems: Array<SegmentedBarItem>;
    public selectedIndex = 0;
    public prop: string = "Item 1";
    public visibility1 = true;
    public visibility2 = false;
    public state = 0;
    public jokes: Array<joke>;
    constructor(private _routerExtensions: RouterExtensions) {
        // this.myjokes = jokesdata;
        this.dataStore = Kinvey.DataStore.collection<list1>('faceCollection');
        this.myItems = [];
        for (let i = 1; i < 3; i++) {
            const item = new SegmentedBarItem();
            if(i == 1){item.title = "Jokes ";}
            else if(i==2){item.title = "Most Funny";}
            
            this.myItems.push(item);}
        this.jokes = [];
        for(let i=0; i<myjokes.length;i++){
            this.jokes.push(new joke(myjokes[i]));
        }

        }
    
        public onSelectedIndexChange(value) {
            let segmetedBar = <SegmentedBar>value.object;
          
            this.selectedIndex = value;
            if(segmetedBar.selectedIndex == 0){
                console.log("--List")
                this.visibility1 = true;
                this.visibility2 = false;
            } else{
                console.log("++Graphs")
                this.visibility1 = false;
               this.visibility2 = true;
               const aggregation = Kinvey.Aggregation.average("percentage").by("jnum");
  return this.dataStore.group(aggregation).subscribe(
      d => {this.myjokes = d});
            }   
        }
    
        public onItemTap(args) {
            myGlobals.UrlComponent.urlArray = args.index;
            this._routerExtensions.navigate(['/home']);
            console.log("Item Tapped at cell index: " + args.index);
         }

    ngOnInit(): void {
        if(Kinvey.User.getActiveUser()){
           console.log("Active user");
        //    let abc = this.dataStore.pull();
        //     console.log(abc);
           }
           else{
            
            Kinvey.User.login("admin","admin").then(()=>{
                console.log("Will be active");
                }).catch((e)=>{
                    alert(e);
                });
            }
    }
    onTrackBallContentRequested(args: TrackballCustomContentData) {
 
    let tempValue = args.pointData.jnum;
    for(let i=0;i<=myjokes.length; i++){
        if(i == tempValue){
            args.content = myjokes[i];
        }
    }
    }
}