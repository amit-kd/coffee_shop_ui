import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { HttpService } from './http.service';
import { XHRBackend, RequestOptions, HttpModule } from '../../../node_modules/@angular/http';
import { ProgressbarModule } from '../../../node_modules/ngx-bootstrap';
import { httpServiceFactory } from './http-service.factory';

@NgModule({
  imports: [
    CommonModule, ProgressbarModule.forRoot(), HttpModule
  ],
  declarations: [LoaderComponent],
  exports: [
    LoaderComponent
  ], providers: [
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }
  ]
})
export class CoreModule { }
