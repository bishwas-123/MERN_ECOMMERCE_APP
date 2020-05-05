import React from "react";
import axios from "axios";
import ProductList from '../components/Index/ProductList';
import BaseUrl from '../utils/baseUrl';
import Pagignation from '../components/Index/ProductPagination';
function Home({ products,totalPages }) {
  //console.log(products);
  return (<><ProductList products={products}/>
     <Pagignation totalPages={totalPages}/></>
    );
}

Home.getInitialProps = async ctx => {
  // fetch data on server
  const page=ctx.query.page?ctx.query.page:'1';
  const size=12;
  const url = `${BaseUrl}/api/products`;
  const payload={params:{page,size}};
  const response = await axios.get(url,payload);
  //console.log(response.data);
  return response.data;
  // return response data as an object
};

export default Home;
