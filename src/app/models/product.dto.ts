export class ProductDTO {
    public id: String;
    public title: String;
    public privewImages: Array<String>;
    public rating: String;
    public noOfReviews: String;
    public description: String;
    public currentPrice: String;
    public enjoyedPercentage: String;
    public noOfVotes: String;
    public isLiked: boolean;
    public stockCount: number;
    public quantity: number;
    public thresholdStockCount: number;
    public isAddedToCart: boolean;

    constructor(id = "", title = "", privewImages = [], rating = "", noOfReviews = "", description = "", currentPrice = "", enjoyedPercentage = "", noOfVotes = "", isLiked = false, stockCount = 0, quantity = 1, thresholdStockCount = 0, isAddedToCart = false) {
        this.id = id;
        this.title = title;
        this.privewImages = privewImages;
        this.rating = rating;
        this.noOfReviews = noOfReviews;
        this.description = description;
        this.currentPrice = currentPrice;
        this.enjoyedPercentage = enjoyedPercentage;
        this.noOfVotes = noOfVotes;
        this.isLiked = isLiked;
        this.stockCount = stockCount;
        this.quantity = quantity;
        this.thresholdStockCount = thresholdStockCount;
        this.isAddedToCart = isAddedToCart;
    }
}