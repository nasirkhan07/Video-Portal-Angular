
/**
 * Interface/Model for Video object
 * 
 * @export
 * @interface Video
 */
export interface Video{
    description:string;
    name:string;
    ratings:number[];
    url:string;
    _id:string;
    paused?:boolean;
    height?:string;
    
}