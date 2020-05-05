//import products from '../../static/products.json';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
connectDb();
export default async (req,res)=>{
    const {page,size}=req.query;
    const pageNumber=Number(page);
    const pageSize=Number(size);
    const totalDoc=await Product.countDocuments();
    const totalPages=Math.ceil(totalDoc/pageSize);
    let products=[];
    if(pageNumber==1){
        products=await Product.find().limit(pageSize);
    }else{
        const skips=pageSize*(pageNumber-1);
        products=await Product.find().skip(skips).limit(pageSize);
    }
   // const products=await Product.find();
    res.status(200).json({products,totalPages});
}