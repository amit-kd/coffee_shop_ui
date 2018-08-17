export class SignUPDTO {
    email: String;
    password: String;
    dob: String;
    name: String;
    confirmPassword: String;
    constructor(email = "", name = "", password = "", confirmPassword = "", dob = "") {
        this.email = email;
        this.name = name;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.dob = dob;
    }
};
