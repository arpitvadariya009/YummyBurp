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

exports.getBag = async (req, res)=>{
    try{
        const id = req.headers.id;
      
        const data = await Bag.findById(id).populate("rest_id")

        res.status(400).json({
            success : false,
            message : "internal server error",
            data : data
        });
        }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "internal server error"
        });
    }
}