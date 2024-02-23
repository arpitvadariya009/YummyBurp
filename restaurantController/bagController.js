const Bag = require('../models/bagsModel')

exports.createBag = async (req, res)=>{
    try{
        const bag = await Bag.create(req.body);

        res.status(200).json({
            success : true,
            message : "bag created successfully",
            data : bag
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "internal server error"
        });
    }
}