import Stripe from 'stripe';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import calculateCartTotal from '../../utils/calculateCartTotal';
import Order from '../../models/Order';
const stripe=Stripe(process.env.STRIPE_SECRET_KEY);
console.log("STRIPE"+stripe);
export default async(req,res)=>{
    const {paymentdata}=req.body
    console.log('PAYMENT DATA BELOW')
    console.log({paymentdata});
    console.log({paymentdata});
    console.log('PAYMENT DATA ABOVE')
    try{
        const {userId}=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
       const cart=await  Cart.findOne({user:userId}).populate({
            path:'products.product',
            model:'Product'
        })
        const {cartTotal,stripeTotal}=calculateCartTotal(cart.products);
        const prevCustomer=await stripe.customers.list({
            email:paymentdata.email,
            limit:1
        })
        const isExistingCustomer=prevCustomer.length>0;
        let newCustomer;
        if(!isExistingCustomer){
            newCustomer=await stripe.customers.create({
                email:paymentdata.email,
                source:paymentdata.id
            })

        }
        const customer=(isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
        const charge = await stripe.charges.create(
            {
              currency: "usd",
              amount: stripeTotal,
              receipt_email: paymentdata.email,
              customer,
              description: `Checkout | ${paymentdata.email} | ${paymentdata.id}`
            },
            {
              idempotency_key: uuidv4()
            }
          );

        new Order({
            user:userId,
            email:paymentdata.email,
            total:cartTotal,
            products:cart.products

        }).save();
        await Cart.findOneAndUpdate(
            { _id: cart._id }, 
            { $set: { products: [] } })
        res.status(200).send("Checkout successful");
    }
    catch(error){
        console.error(error);
        res.status(403).send("Error Checkout products");
    }

}