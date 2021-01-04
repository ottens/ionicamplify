import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-enterprise/camera/ngx';//import in app.module.ts
// import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
// import Amplify from 'aws-amplify';

// import awsconfig from '../aws-exports';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { CameraComponent } from './camera/camera.component';
// import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// Amplify.configure(awsconfig);


// @NgModule({
//   imports: [
//   ...
//   RouterModule.forRoot([
//     { path: '', component: LoginComponent },
//     { path: 'detail', component: DetailComponent },
//   ])
//   ],
// })
@NgModule({
  declarations: [AppComponent, MainComponent, CameraComponent],
  entryComponents: [],
  imports: [
    AmplifyUIAngularModule,
    BrowserModule,
    IonicModule.forRoot(),
    // AppRoutingModule,
    FormsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    RouterModule.forRoot([
    { path: '', component: MainComponent },
    { path: 'todos', component: AppComponent },
  ]),
  ],
  providers: [
    Camera,
    // StatusBar,
    // SplashScreen,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [MainComponent]
})
export class AppModule {}
