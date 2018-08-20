# coffee_shop_ui - Angular 6, HTML 5 , CSS 3 , Bootstrap, NGX-Bootstrap, CI/CD with Circle CI, Firbase(Hosting Server)
This project contain all ui logic for coffee shop. This connects to backend code @ https://i-coffee-shop.herokuapp.com/. It has login of sisgnup, login, product listing, cart vewing, saved product loading to cart, saving a product, viewing product details, liking a product if user is logged in, calculating total, submitiing a product, order status tracking

# How to Run
1) Install Node
2) Install angular/cli
3) Do "npm install" to install dependencies in the main folder
4) Run the project using "ng serve"
5) Build "npm run build"  (for dev), "npm run build --prod" (for prod)

# How to deploy
1) Push your chnages to master branch
2) It will trigger deployment in Circle ci using configuration avialble in .circle/config.yml.
3) Product is live @ https://coffee-shop-e3bbd.firebaseapp.com

*Note: If page loading takes time, that means dynos are sleeping as I am using free version of Heroku. Just refresh "https://i-coffee-shop.herokuapp.com/" should work. It is mandatory to refresh before launching the front end application.

# Workflow:
1) Login / Sign up is available in header section so that it can be accessible from all the pages. Logout is available in dropdown menu after clicking on the user name.
2) Product & Order links are available in top header section.
3) Product listing and details page is not secured as anonymous user can view the products.
4) Order page is secured as user can see his/her prodcuts only.
5) Onclick of product title, it will show product details page.
6) You can add products in products page which will reflect in cart in top left part of the header.
7) Once you clik on the Cart icon, it will redirect you to login and once login user can see the cart.
8) On cart page he can add products. once he selects date and time of order, he can then save the order which can loaded back to cart or he can submit the order.
9) User can like/unlike a product by going to product details page.
10) Order details can be viewed after the login, It list all orders with order staus.
11) Onlcik of order id it will load the order to the cart

# Assumptions:
1) I have added one user for testing purpose: amitkdas@1.com, password: "123"(Without quotes)
2) I have added default 3 products, and stocks.
3) Stocks won't change even after placing an order.
4) User can only add 4 products per order.
5) if stock is less and use saved more product, onloading of the cart it will aut adjust the product. This can be tested by making stock less in db.
6) Threshold stock is 4 for all products.
