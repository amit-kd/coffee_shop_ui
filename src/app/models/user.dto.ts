import { SignUPDTO } from "./signup.dto";

export class UserDTO extends SignUPDTO {
    public id: String;
    public isLogged: boolean;
    constructor(id = "", email = "", name = "", password = "", dob = "", isLogged = false) {
        super(email, name, password, dob);
        this.id = id;
        this.isLogged = isLogged;
    }

};
