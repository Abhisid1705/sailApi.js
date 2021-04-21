
const user = require("../models/User");

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
        User.findOne({email:email}).then(user=>{
            if(user){
                throw new Error("error occured");
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
                message:"user exist ,can not re register",
                error:err.message,
            })
        })

    },
    updateUser:(req,res)=>{
           userId=req.params.userId;
           name:req.body.name;
            User.findOne({id:userId}).then(user=>{
                if(!user){
                    return res.status(404).json("Not an user");
                }
                user.updateOne({id:userId}).set({name:name}).then(user=>{
                    res.status(200).json({msg:"done"});
                })
            }).catch(err=>{
                return res.status(500).json({error:"some error occured please try later"});
            })
    },
    deleteUser:(req,res)=>{
        userId=req.params.userId;
        user.destroy({id:userId}).then(result=>res.json("user removed from db")).catch(err=>{
            return res.json({error:error});
        })
    }
}