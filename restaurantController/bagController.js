const Bag = require('../models/bagsModel')
const geolib = require('geolib'); 
const User = require('../models/U_loginModel')
const feedback = require('../models/feedbackModel')
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

exports.getBag = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await User.findById(userId);

        const userLocation = {
            latitude: user.location.coordinates[1],
            longitude: user.location.coordinates[0]
        };

        const bags = await Bag.find({}).populate("rest_id");

        // Calculate distance and fetch feedback for each bag
        const bagsWithRating = await Promise.all(bags.map(async (bag) => {
            const restLocation = bag.rest_id.location.coordinates;
            const distance = geolib.getDistance(userLocation, {
                latitude: restLocation[1],
                longitude: restLocation[0]
            });

            // Fetch feedback for the restaurant
            const ratings = await feedback.find({ restaurant_id: bag.rest_id._id });
            let averageRating = 0;
            if (ratings.length > 0) {
                const sumRating = ratings.reduce((total, rating) => total + rating.rating, 0);
                averageRating = sumRating / ratings.length;
                averageRating = parseFloat(averageRating.toFixed(2));
            }
        
            return {
                ...bag.toObject(),
                distance: distance / 1000,
                averageRating: averageRating
            };
        }));

        res.status(200).json({
            success: true,
            message: "Listing successful",
            data: bagsWithRating
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};