
import { environment } from '../environments/environment'
import { Injectable } from "@angular/core";
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable()
export class RestEndPointService {
    private readonly baseUrl = (<any>environment).baseUrl;
    private activeSessionId = null;
    constructor() {

    }
    /**
     * Getter for Login api
     * 
     * @readonly
     * @memberof RestEndPointService
     */
    get login() {
        return `${this.baseUrl}/user/auth`;
    }

    /**
     * getter for new user Add
     * 
     * @readonly
     * @memberof RestEndPointService
     */
    get newUser() {
        return `${this.baseUrl}/user/new`;
    }
    /**
    * Getter for Logout api
    * 
    * @readonly
    * @memberof RestEndPointService
    */
    get logout() {
        const { sessionid } = { sessionid: Cookie.get('sessionId') };
        return !!sessionid ? `${this.baseUrl}/user/logout?sessionId=${sessionid}` : null;
    }
    /**
    * Getter function for fetching Videos Api
    * 
    * @readonly
    * @memberof RestEndPointService
    */
    getvideos(lmt = 10, skp = 0) {

        const { sessionid, skip, limit } = { sessionid: Cookie.get('sessionId'), limit: lmt, skip: skp };
        return !!sessionid ? `${this.baseUrl}/videos?sessionId=${sessionid}&skip=${skip}&limit=${limit}` : null;
    }
    /**
    * Getter function for fetching single Video Api
    * 
    * @readonly
    * @memberof RestEndPointService
    */
    getVideo(vidid) {
        const { sessionid, videoid } = { sessionid: Cookie.get('sessionId'), videoid: vidid };
        return !!sessionid ? `${this.baseUrl}/video?sessionId=${sessionid}&videoId=${videoid}` : null;
    }
    /**
     * Getter function for Rating single Video Api
     * 
     * @readonly
     * @memberof RestEndPointService
     */
    get rateVideo() {
        const { sessionid } = { sessionid: Cookie.get('sessionId') };
        return !!sessionid ? `${this.baseUrl}/video/ratings?sessionId=${sessionid}` : null;
    }

    /**
     * Setter function for updating inmemory session id--should be removed after use of cookie--to do
     * 
     * @readonly
     * @memberof RestEndPointService
     */
    set updateSessionId(id: string) {
        this.activeSessionId = id;
    }
    /**
    * Reset function for updating inmemory session id--should be removed after use of cookie--to do
    * 
    * @readonly
    * @memberof RestEndPointService
    */
    set resetSessionId(id: any) {
        this.activeSessionId = null;
    }

    /**
     * Getter for session id
     * 
     * @readonly
     * @memberof RestEndPointService
     */
    get sessionId() {
        return Cookie.get('sessionId');
    }

    /**
     * Getter for username
     * 
     * @readonly
     * @memberof RestEndPointService
     */
    get user() {
        return Cookie.get('user');
    }
}