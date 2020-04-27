import ConnectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Cart from '../../models/Cart';
ConnectDb();
export default async(req,res)=>{
    const {name,email,phone,password}=req.body
    try{
        if(!isLength(name,{min:3,max:12}))
            return res.status(422).send('Name must be 3 to 12 characters long')
        else if(!isLength(password,{min:6}))
            return res.status(422).send('password must be minimum 6 characters long');
       else if(!isEmail)
        return res.status(422).send('Email is not valid !')

        const user=await User.findOne({email});
        if(user){
            res.status(422).send(`User already exists with the given email : ${email}`);
        }
        const hash=await bcrypt.hash(password,10);

       const newUser= await new User(
            {
                name,
                email,
                phone,
                password:hash
            }
        ).save();
        await new Cart({user:newUser._id}).save();
  console.log(newUser);
  const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{
      expiresIn:'7d'
  });
  res.status(200).json(token);

    }
    catch(error){
        console.error(error);
        res.status(500).send('Error signing up user, please try again later');
    }


}