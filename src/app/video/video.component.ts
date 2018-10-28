import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { RestEndPointService } from ".././rest-endpoint.service";
import { Video } from "app/models/videos.model";
import { VideoService } from "app/Services/video.service";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {

  constructor(public router: Router, private route: ActivatedRoute, private apiService: RestEndPointService,
    private vidServ: VideoService) { }

  video: Video;
  videos: Video[];
  isLoading = false;
  isMultiLoading = false;

  @ViewChild("vid") videoelem: HTMLVideoElement;
  private obsCancel = new Subject<boolean>();

  ngOnInit() {
    window.onscroll = null;
    //Routing parameter get and video fetch
    this.route.params.subscribe(val => {
      this.vidServ.scrollUnsub.next(true);
      if (this.apiService.sessionId != 'null') {
        this.video = null;
        this.isMultiLoading = true;
        this.vidServ.getVideo(val.id).takeUntil(this.obsCancel).subscribe((res: any) => {
          this.isMultiLoading = false;
          if (!!res) {
            this.video = JSON.parse(res._body).data;
          }
        }, err => this.isMultiLoading = false, () => this.isMultiLoading = false);

        this.isLoading = true;
        this.vidServ.getVideos().takeUntil(this.obsCancel).subscribe((vids: any) => {
          this.isLoading = false;
          if (!!vids) {
            this.videos = JSON.parse(vids._body).data.map(e => ({ ...e, paused: false, height: '20px' })).filter(v => v._id != val.id);
          }
        },
          err => this.isLoading = false,
          () => this.isLoading = false);
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }

  /**
   * fetch Videos function
   * 
   * @memberof VideoComponent
   */
  fecthVideos = () => {
    this.isMultiLoading = true;
    this.vidServ.getVideos().takeUntil(this.obsCancel).subscribe((vids: any) => {
      this.isMultiLoading = false;
      if (!!vids) {
        this.videos = JSON.parse(vids._body).data.map(e => ({ ...e, paused: false, height: '20px' }));
      }
    }, err => this.isMultiLoading = false, () => this.isMultiLoading = false);
  }

  /**
   * 
   *Fetch Video Function 
   * @memberof VideoComponent
   */
  fecthVideo = (id) => {
    this.vidServ.getVideo(id).takeUntil(this.obsCancel).subscribe((res: any) => {
      if (!!res) {
        this.video = JSON.parse(res._body).data;
      }
    });
  }

  /**
   * 
   *Video Play/pause toggle 
   * @param {any} video 
   * @memberof VideoComponent
   */
  togglePlay(video) {
    if ((<any>this.videoelem).nativeElement.paused) {
      (<any>this.videoelem).nativeElement.play();
    } else {
      (<any>this.videoelem).nativeElement.pause();
    }

  }

  /**
   * 
   *Average for Rating Star caculation 
   * @memberof VideoComponent
   */
  average = (input: number[]) => {
    if (input instanceof Array) {
      return input.reduce((fst, scnd) => fst + scnd) / input.length;
    }
  }

  /**
   * 
   * Rate Video Function 
   * @param {any} videoid 
   * @param {any} rating 
   * @memberof VideoComponent
   */
  rateVideo(videoid, rating) {
    this.vidServ.rateVideo({ videoId: videoid, rating: rating }).takeUntil(this.obsCancel).subscribe(res => {
      this.fecthVideo(videoid);
    })
  }
  ngOnDestroy() {
    this.obsCancel.next(true);
    this.obsCancel.complete();
    this.obsCancel.unsubscribe();
  }
}
