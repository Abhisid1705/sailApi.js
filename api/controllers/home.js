
const user = require("../models/User");
const isEmail=require('../controllers/validations').validateEmail;

module.exports={
    welcome:(req,res)=>{
       return res.json({
            Message:"Hi User",
            info:{
                "GET /": "to get info about all routes",
                'POST /user/register':"to create",
                'POST /update/:userId':"to update",
                'POST remove/:userId':"to delete user",
            
            }
        })
    },
    
    
    registerUser:(req,res)=>{
        let name=req.body.name;
        let email=req.body.email;
        let password=req.body.password;
        let isSubscribedApp=Boolean(req.body.isSubscribed);
        let isValidEmail=isEmail(email);
        if(!isValidEmail){
            let newError=new Error("not a valid email")
            return res.json({msg:newError.message});
        }
        if(!name && !password){
            let newError=new Error("Invalid name");
            return res.json({msg:newError.message});
        }
        User.findOne({email:email}).then(user=>{
            if(user){
                throw new Error("can not re register");
            }
            return User.create({
                name:name,
                email:email,
                password:password,
                isSubscribedApp:isSubscribedApp
            }).fetch()

        }).then(result=>{
            return res.status(201).json({message:result});
        }).catch(err=>{
            return res.status(500).json({
                // message:"user exist ,can not re register",
                error:err.message,
            })
        })

    },
    updateUser:(req,res)=>{
           userId=req.params.userId;
           let  oldName=req.body.oldName;
           let newName=req.body.newName;
           if(!oldName && !newName){
               let err=new Error("Name field not correct");
               return res.status(404).json({error:err});
           }
            User.findOne({id:userId}).then(user=>{
                if(!user){
                    return res.status(404).json("Not an user");
                }
                if(user.name!=oldName){
                    return res.status(404).json({msg:"name did not match,you might have updated or not registered"});
                }
                User.updateOne({name:oldName}).set({name:newName}).then(user=>{
                   return res.status(200).json({msg:user});
                })
            }).catch(err=>{
                return res.status(500).json({error:err.message});
            })
    },
    deleteUser:  (req,res)=>{
        let userId=req.params.userId;
        User.findOne({id:userId}).then(user=>{
            if(user){
                async (userId)=>{
                   let deletedUser=await  User.destroy({id:userId}).fetch();
                   return res.json({deletedUser:deletedUser});
                }
            }
        if(!user)
            return res.json({msg:"not an user"});
            
        }).catch(err=>{
            return res.json({msg:"unknown"})
        })
        
        
       
       
    //    .then(result=>res.json("user removed from db")).catch(err=>{
    //         return res.json({error:error});
    },
    getUser: async (req,res)=>{
        try{
            let all= await User.find();
            if(all){
                return res.status(200).json({user:all});
            }
            else{
                throw new Error("some error occured");
            }
        }
        catch(error){
            return res.status(404).json({msg:error.message});
        }

    }
}