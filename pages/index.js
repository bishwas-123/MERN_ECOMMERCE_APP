import React from 'react';
import axios from 'axios';
function Home() {
  React.useEffect(()=>{
    getProducts();
  },[])

  function getProducts(){
     const url='';
     axios.get(url);
  }
  return <>home</>;
}

export default Home;
