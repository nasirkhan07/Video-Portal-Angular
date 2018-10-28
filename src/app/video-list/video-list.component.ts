import { Component, OnInit, ViewChildren, QueryList, ViewChild, OnDestroy } from '@angular/core';
import { RestEndPointService } from "app/rest-endpoint.service";
import { Http } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Video } from ".././models/videos.model";
import { VideoService } from "app/Services/video.service";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "app/Services/authentication.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {

  videos: Video[] = [];
  isLoading = false;
  onscrollSub: Subscription;

  @ViewChild('container') container: any;
  @ViewChildren("vid") videoelems: QueryList<HTMLVideoElement>;

  constructor(private apiService: RestEndPointService, private router: Router, private vidServ: VideoService,
    private authServ: AuthenticationService, private route: ActivatedRoute) {
    this.vidServ.scrollUnsub.subscribe(val => {
      if (val) {
        Observable.fromEvent(window, 'scroll').subscribe(res => {
        })
      }
    })
  }

  private lazyVals = { lmt: 10, skip: 0 };
  private obsCancel = new Subject<boolean>();
  lazyLoading = false;


  /**
   * 
   * Play/pause sync 
   * @param {Video} video 
   * @memberof VideoListComponent
   */
  normalizeVideoPlay(video: Video) {
    this.videoelems.filter((ve: any) => {
      return ve.nativeElement.id !== video._id
    }).forEach((ee: any) => ee.nativeElement.pause());

    (<any>this.videoelems.find((v: any) => v.nativeElement.id == video._id)).nativeElement.play();

  }

  /**
   * Average for use in rating component[star]
   * 
   * @memberof VideoListComponent
   */
  average = (input: number[]) => {
    if (input instanceof Array) {
      return input.reduce((fst, scnd) => fst + scnd) / input.length;
    }
  }

  ngOnInit() {
    //onscroll event assignement for lazy loading of videos
    this.onscrollSub = Observable.fromEvent(window, 'scroll').takeUntil(this.obsCancel).debounceTime(300).subscribe(res => {
      this.lazyLoadVids();
    })

    if (this.apiService.sessionId != 'null') {
      this.authServ.loginStateChanged.next({ success: true, user: this.apiService.user })
      this.fecthVideos();
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * 
   *Function to fetch videos 
   * @memberof VideoListComponent
   */
  fecthVideos = (lazy = false) => {
    this.isLoading = true;
    let time = 0;
    if (lazy) {
      this.lazyLoading = true;
      time = 250;
      // this.obsCancel.next(true);
      // this.obsCancel = new Subject();
      // this.lazyVals = { lmt: this.lazyVals.lmt - 10, skip: this.lazyVals.lmt - 10 };

    }

    this.vidServ.getVideos(this.lazyVals.lmt, this.lazyVals.skip)
      .debounceTime(time)
      .takeUntil(this.obsCancel).subscribe((vids: any) => {
        this.isLoading = false;
        if (!!vids) {
          if (lazy && this.videos instanceof Array) {
            this.lazyLoading = false;
            this.videos = this.videos.concat(JSON.parse(vids._body).data.map(e => ({ ...e, paused: false, height: '20px' })));
          }
          else {
            this.videos = JSON.parse(vids._body).data.map(e => ({ ...e, paused: false, height: '20px' }));
          }
        }
      }, err => this.isLoading = false, () => this.isLoading = false);
  }

  /**
   * Function to rate video--used as output
   * 
   * @param {any} videoid 
   * @param {any} rating 
   * @memberof VideoListComponent
   */
  rateVideo(videoid, rating) {
    this.vidServ.rateVideo({ videoId: videoid, rating: rating }).takeUntil(this.obsCancel).subscribe(res => {
      this.fecthVideos()
    })
  }


  /**
   * LazyLoad handler function--assigned to  window scroll event
   * 
   * @memberof VideoListComponent
   */
  lazyLoadVids = () => {
    if (window.location.hash.lastIndexOf('/') != 1) {
      return;
    }
    const cheight = this.container.nativeElement.offsetHeight;
    const yoffst = window.pageYOffset;
    const y = yoffst + window.innerHeight;
    if (y >= cheight) {
      this.lazyVals = { lmt: this.lazyVals.lmt + 10, skip: this.lazyVals.lmt };
      this.fecthVideos(true);
    }

  }

  ngOnDestroy = () => {
    this.obsCancel.next(true);
    this.obsCancel.complete();
    this.obsCancel.unsubscribe();
    if (this.onscrollSub) this.onscrollSub.unsubscribe();
  }
}
