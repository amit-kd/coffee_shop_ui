import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { HttpService } from './http.service';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { ProgressbarModule } from 'ngx-bootstrap';
import { httpServiceFactory } from './http-service.factory';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './authnication/http-interceptor';

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
