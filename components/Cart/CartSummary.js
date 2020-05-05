import {Button,Segment,Divider} from 'semantic-ui-react';
import React from 'react';
import calculateCartTotal from '../../utils/calculateCartTotal';
import StripeCheckout from 'react-stripe-checkout';
function CartSummary({products,handleCheckout,success}) {
  const [isCartEmpty,setCartEmpty]=React.useState(false);
  const[cartAmount,setCartAmount]=React.useState(0);
  const[stripeAmount,setStripeAmount]=React.useState(0);

  React.useEffect(()=>{
    const {cartTotal,stripeTotal}=calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length===0);
  },[products]);

  return <>
    <Divider/>
    <Segment clearing size="large">
      <strong>Subtotal : </strong>$ {cartAmount}
      <StripeCheckout
          name="ecommerce-bishwas"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_0q8taO7jVcsv5VU6xd1MvR6X00viFVd9aA"
          token={handleCheckout}
          triggerEvent="onClick"
        >
      <Button
      disabled={isCartEmpty || success}
        icon="cart"
        color="teal"
        floated="right"
        content="Checkout"
      />

</StripeCheckout>

    
    </Segment>
  </>
}

export default CartSummary;
