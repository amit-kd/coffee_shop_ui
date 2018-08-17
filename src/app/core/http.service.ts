import { Injectable } from '@angular/core';

import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';

import { AngularReduxRequestOptions } from './angular-redux-request.options';

import { LoaderService } from './loader/loader.service';
import { Observable } from '../../../node_modules/rxjs';
import { throwError } from '../../../node_modules/rxjs';
import { catchError, tap, finalize, map } from 'rxjs/operators';

@Injectable()
export class HttpService extends Http {
    constructor(backend: XHRBackend, defaultOptions: AngularReduxRequestOptions, private loaderService: LoaderService) {
        super(backend, defaultOptions);
    }

    get<T>(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return super.get(url, this.requestOptions(options))
            .pipe(
                map((res: Response) => {
                    return res.json() || {};
                }),
                catchError(this.onCatch),
                tap((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                }),
                finalize(() => {
                    this.onEnd();
                })
            );
    }

    post<T>(url: string, T, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return super.post(url, T, this.requestOptions(options))
            .pipe(
                map((res: Response) => {
                    return res.json() || {};
                }),
                catchError(this.onCatch),
                tap((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                }),
                finalize(() => {
                    this.onEnd();
                })
            );
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new AngularReduxRequestOptions();
        }
        if (!options.headers) {
            options.headers = new Headers();
        }
        return options;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return throwError(error);
    }

    private onSuccess(res: Response): void {

        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }
}