// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Internal imports
import { UserLoginComponent } from './user-login/user-login.component';
import { VideoListComponent } from "./video-list/video-list.component";
import { VideoComponent } from "./video/video.component";
import { AuthGuardService } from "app/Services/auth-guard.service";
import { SignupComponent } from "app/signup/signup.component";

/**
 * Main app routing i.e. for root
 * @export
 * @class AppRoutingModule
 */
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'videos',
                pathMatch: 'full',

            },
            {
                path: 'videos',
                component: VideoListComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'videos/:id',
                component: VideoComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'login',
                component: UserLoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            },
            {
                path: '**',
                redirectTo: 'login',
                pathMatch: "full"
            }
        ],
            { useHash: true }
        )
    ],
    providers: [AuthGuardService],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
