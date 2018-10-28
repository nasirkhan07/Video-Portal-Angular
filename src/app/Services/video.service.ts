import { Injectable } from '@angular/core';
import { RestEndPointService } from "app/rest-endpoint.service";
import { Http } from "@angular/http";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Subject } from "rxjs/Subject";

@Injectable()
export class VideoService {

  constructor(private http: Http, private apiService: RestEndPointService) { }
scrollUnsub= new Subject();
  /**
   * Get Multiple Videos http api
   * 
   * @memberof VideoService
   */
  getVideos = (lmt = 10, skp = 0) => {
    if (!!Cookie.get('sessionId')) {
      return this.http.get(this.apiService.getvideos(lmt, skp));
    }
  }

  /**
   * Get Single Video http api
   * 
   * @memberof VideoService
   */
  getVideo = (vidid) => {
    if (!!!!Cookie.get('sessionId') && !!this.apiService.getVideo(vidid)) {
      return this.http.get(this.apiService.getVideo(vidid));
    }
  }

  /**
   * Rate Video http api
   * 
   * @param {{ videoId: string, rating: string }} ratingObj 
   * @returns 
   * @memberof VideoService
   */
  rateVideo(ratingObj: { videoId: string, rating: string }) {
    if (!!!!Cookie.get('sessionId') && !!this.apiService.rateVideo) {
      return this.http.post(this.apiService.rateVideo, ratingObj);
    }
  }

}
