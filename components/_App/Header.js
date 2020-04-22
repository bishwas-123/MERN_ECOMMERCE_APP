import {Menu, Container,Icon,Image} from 'semantic-ui-react';
import Link from 'next/link';
import Router,{useRouter} from 'next/router';
import Nprogress from 'nprogress';
function Header() {
  const user=false;
  const router=useRouter();
  function isActive(router){
    return router ===router.pathname;
  }
  Router.onRouteChangeStart=()=>Nprogress.start();
  Router.onRouteChangeComplete=()=>Nprogress.done();
  Router.onRouteChangeError=()=>Nprogress.done();
  
  return (
    <Menu fluid id="Menu" inverted>
      <Container>
        <Link href='/'>
          <Menu.Item header>
              <Image 
               size="mini"
               src="/static/logo.svg"
               style={{marginRight:'1em'}}
               />
               React Reserve
          </Menu.Item>
        </Link>
        <Link href='/cart'>
          <Menu.Item header active={isActive('/cart')}>
               <Icon 
                name="cart"
                size="large"
               />
               Cart
          </Menu.Item>
        </Link>
        { user &&
        <Link href='/create'>
          <Menu.Item header active={isActive('/create')}>
               <Icon 
                name="add square"
                size="large"
               />
               Create
          </Menu.Item>
        </Link>}
        {user?(<>
        <Link href='/account'>
          <Menu.Item header active={isActive('/account')}>
               <Icon 
                name="user"
                size="large"
               />
               Account
          </Menu.Item>
        </Link>
        
          <Menu.Item header>
               <Icon 
                name="sign out"
                size="large"
               />
               Logout
          </Menu.Item>
          </>)
          :
        (<>
        <Link href='/login'>
          <Menu.Item header active={isActive('/login')}>
               <Icon 
                name="sign in"
                size="large"
               />
               Login
          </Menu.Item>
        </Link>
        <Link href='/signup'>
          <Menu.Item header active={isActive('/signup')}>
               <Icon 
                name="signup"
                size="large"
               />
               Signup
          </Menu.Item>
        </Link>
        </>)}
      </Container>
    </Menu>
  )
}
export default Header;
