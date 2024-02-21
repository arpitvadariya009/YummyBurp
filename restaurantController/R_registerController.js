const R_register = require('../models/R_registerModel');

exports.restRegisiter = async (req, res)=>{
    try{
        const email = req.body.email;
        const existUser = await R_register.findOne({email:email});

        if(existUser){
            res.status(200).json({
                success : false,
                message : "email already exist"
            })
        }else{
            const user = await R_register.create({
                ...req.body,
                rest_bannerImg : req.file && req.file.filename
            })
            res.status(200).json({
                success : true,
                message : "restaurant register successfully",
                data : user
            })
        }
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}