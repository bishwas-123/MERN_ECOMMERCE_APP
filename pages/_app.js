import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies,destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { Router } from "next/router";


class MyApp extends App {

  static async getInitialProps({Component,ctx}){
    const {token}=parseCookies(ctx);
    let pageProps={};
    if(Component.getInitialProps){
      pageProps=await Component.getInitialProps(ctx)
    }
    if(!token){
      const isProtectedRoute=ctx.pathname==='/account' || ctx==='/create';
      if(isProtectedRoute){
        redirectUser(ctx,'/login');
      }
    }
    else{
      try{
        const payload={headers:{Authorization:token}};
        const url=`${baseUrl}/api/account`;
        const response = await axios.get(url,payload);
        const user=response.data;
        const isRoot=user.role==='root';
        const isAdmin=user.role==='admin';
        if(!(isAdmin || isRoot) && ctx.pathname==='/create')
            redirectUser(ctx,'/');

       
        pageProps.user=user;
        console.log("TEST   +++ "+user);
      }
      catch(error){
         console.log("Error : "+error);
         destroyCookie(ctx,'token');
         redirectUser(ctx,'/login')
      }
    }
   return {pageProps};
  }
  componentDidMount(){
    window.addEventListener('storage',this.synclogout);
  }
  synclogout=event=>{
    if(event.key==='logout'){
      Router.push('/login');

    }

  }

  render() {
    const { Component,pageProps } = this.props;
    return (
      <Layout {...pageProps}>
         <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default MyApp;
