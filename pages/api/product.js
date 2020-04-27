import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
connectDb();
export default async(req,res)=>{
    switch(req.method){
        case 'GET':
            await handleGetRequestForProduct(req,res);
            break;
        case 'DELETE':
            await handleDeleteRequestForProduct(req,res);
            break;
        case 'POST':
            await handlePostRequestForProduct(req,res);
            break;
        default:
            res.status(405).send(`Mthod ${req.method} is not allowed`);
            break;
    }
}
async function handlePostRequestForProduct(req,res){
    const {name,price,description,mediaUrl}=req.body
    try{
        if(!name || !price || !description || !mediaUrl)
        return res.status(422).send('Some information is missing to add new product !');
        const product=await new Product({
        name,
        price,
        description,
        mediaUrl
    }).save();
    res.status(201).json(product);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server error in creating product !");
    }
   
}
async function handleGetRequestForProduct(req,res){
    const {_id}=req.query;
    const product=await Product.findOne({_id});
    res.status(200).json(product);
}
async function handleDeleteRequestForProduct(req,res){
    const {_id}=req.query;
    const product=await Product.findOneAndDelete({_id});
    res.status(204).json({});
}