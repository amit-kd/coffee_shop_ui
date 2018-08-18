import { ProductDTO } from "./product.dto";
import { Utility } from "../core/Utils/utility";

export class OrderDTO {
    public id: String;
    public date: String;
    public time: String;
    public products: Array<ProductDTO>;
    public status: String;
    public total: String;
    public isSubmit: boolean;
    constructor(id = "", date = "", time = "", products = [], status = "", total = "", isSubmit = false) {
        this.id = id;
        if (date) {
            this.date = date;
        } else {
            this.date = Utility.getDateInFormat(null);
        }
        if (time) {
            this.time = time;
        } else {
            this.time = Utility.getDateInFormat(null, true);
        }
        this.products = products;
        this.status = status;
        this.total = total;
        this.isSubmit = isSubmit;
    }
}