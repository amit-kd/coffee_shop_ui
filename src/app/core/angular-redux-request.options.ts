import { BaseRequestOptions } from '@angular/http';

export class AngularReduxRequestOptions extends BaseRequestOptions {

    public token: string;

    constructor(angularReduxOptions?: any) {

        super();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Authorization', 'Bearer ' + this.token );

        if (angularReduxOptions != null) {

            for (let option in angularReduxOptions) {
                let optionValue = angularReduxOptions[option];
                this[option] = optionValue;
            }
        }
    }

    getLoginRequestOptions(token) {
        this.headers.append('Authorization', 'Basic ' + token);
        return this;
    }

    getAuthorizedRequestOptions() {
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        return this;
    }


}