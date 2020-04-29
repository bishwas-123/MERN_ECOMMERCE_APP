import {Segment,Header,Icon,Button, Item, Message} from 'semantic-ui-react';
import {useRouter} from 'next/router';
function CartItemList({products,user,handleItemRemoveFromCart,success}) {
  function mapProductsToItems(products){
    return products.map(p=>({
      childKey:p.product._id,

      header:(
        <Item.Header as="a" onClick={()=>router.push(`/product?_id=${p.product._id}`)}>
          {p.product.name}
        </Item.Header>
      ),
      image:p.product.mediaUrl,
      meta:`${p.quantity} X ${p.product.price}`,
      fluid:'true',
      extra:(
        <Button
        basic
        icon='remove'
        floated='right'
        onClick={()=>handleItemRemoveFromCart(p.product._id)}
        />
      )

    }))
  }
  const router=useRouter();

  if (success) {
    return (
      <Message
        success
        header="Success!"
        content="Your order and payment has been accepted"
        icon="star outline"
      />
    );
  }
  if(products.length===0){
    return(
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket"/>
         No product in your cart now !

      </Header>
      <div>
        {user?(
          <Button color="orange" onClick={()=>router.push('/')}> View Products</Button>
        ):(
          <Button color="blue" onClick={()=>router.push('/login')}>
            Login to add products

          </Button> 
        )}
      </div>

    </Segment>
    )
  }
  return <Item.Group items={mapProductsToItems(products)}/>



}

export default CartItemList;
