import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import BaseUrl from '../utils/baseUrl';
function Product({product,user}) {
  console.log(product);
  return <>
       <ProductSummary user={user} {...product}/>
       <ProductAttributes user={user} {...product}/>
  </>;
}
Product.getInitialProps=async({query:{_id}})=>{
     const url=`${BaseUrl}/api/product`;
     const payload={params:{_id}};
     const response =await axios.get(url,payload);
     return {product:response.data};
}

export default Product;

