const U_login = require('../models/U_loginModel');

exports.userRegister = async (req, res)=>{
    try{
        const email = req.body.email;
        const existUser = await U_login.findOne({email:email});

        if(existUser){
            res.status(200).json({
                success : false,
                message : "email already exist"
            })
        }else{
            const user = await U_login.create(req.body)
            res.status(200).json({
                success : true,
                message : "user register successfully",
                data : user
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}