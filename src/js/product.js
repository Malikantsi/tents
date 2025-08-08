import { getParam, updateCartCount } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("tents");
const productID = getParam("product");
// const cartElement=
const product = new ProductDetails(productID, dataSource);
product.init();
console.log(product);
updateCartCount();