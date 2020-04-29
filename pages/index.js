import React from "react";
import axios from "axios";
import ProductList from '../components/Index/ProductList';
import BaseUrl from '../utils/baseUrl';
function Home({ products }) {
  return <ProductList products={products}/>
}
Home.getInitialProps = async () => {
  const url = `${BaseUrl}/api/products`;
  const response = await axios.get(url);
  return {products: response.data};
};

export default Home;
