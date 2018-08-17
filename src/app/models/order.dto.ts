import { ProductDTO } from "./product.dto";

export class OrderDTO {
    public id: String;
    public date: String;
    public time: String;
    public products: Array<ProductDTO>;
    public status: String;
    public total: String;
    public productNames: Array<String>;
    constructor(id = "", date = "", time = "", products = [], status = "", total = "", productNames = []) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.products = products;
        this.status = status;
        this.total = total;
        this.productNames = productNames;
    }
}