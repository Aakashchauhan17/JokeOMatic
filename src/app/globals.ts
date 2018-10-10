export class UrlComponent {

    static urlArray;
    constructor() {
      UrlComponent.urlArray = "Inside Contructor";
    }
  
    get staticUrlArray() {
      return UrlComponent.urlArray;
    }

    set staticUrlArray(url){
        UrlComponent.urlArray =url;
    }
  
  }