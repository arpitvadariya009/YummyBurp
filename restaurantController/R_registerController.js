const R_register = require('../models/R_registerModel');
const fs = require('fs');

const handleResponseAndFileDeletion = (res, file, message, success) => {
    if (file) {
        fs.unlinkSync(file.path);
        console.log('File deleted due to database error:', file.path);
    }

    res.status(400).json({
        success: false,
        message,
    });
};

exports.restRegister = async (req, res) => {
    try {
        const email = req.body.email;
        const contactNo = req.body.contactNo;
        console.log(req.body);
        const existUser = await R_register.findOne({ email: email });
        const existCont = await R_register.findOne({ contactNo: contactNo });

        if (existUser && existCont) {
            handleResponseAndFileDeletion(res, req.file, "Email and phone already exist", false);
        } else if (existUser) {
            handleResponseAndFileDeletion(res, req.file, "Email already exists", false);
        } else if (existCont) {
            handleResponseAndFileDeletion(res, req.file, "Phone already exists", false);
        } else {
            const { Latitude, Longitude, ...rest } = req.body;

            const user = await R_register.create({
                ...rest,
                location: {
                    type: 'Point',
                    coordinates: [parseFloat(Longitude), parseFloat(Latitude)],
                },
                rest_bannerImg: req.file && req.file.filename,
            });

            res.status(200).json({
                success: true,
                message: "Restaurant registered successfully",
                data: user,
            });
        }
    } catch (err) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
            console.log('File deleted due to database error:', req.file.path);
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




exports.getRestaurants = async (req, res) => {
    try {
        const { page , limit  } = req.body; 

        const skip = (page - 1) * limit;

        const totalCount = await R_register.countDocuments({
            isDeleted: { $ne: true },
            // verifiedYet: { $ne: false },
            isBanned: { $ne: true },
        });

        const totalPages = Math.ceil(totalCount / limit);

        const restaurants = await R_register.find({
            isDeleted: { $ne: true },
            // verifiedYet: { $ne: false },
            isBanned: { $ne: true },
        })
            .skip(skip)
            .limit(limit);

        if (!restaurants || restaurants.length === 0) {
            return res.status(200).json({ success: false, message: 'No restaurants found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Restaurants List',
            data: restaurants,
            totalCount,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const  restaurantId  = req.params.id;
        const otherDetails = req.body;
      
        const modified_date = new Date();

        const existingRestaurant = await R_register.findById(restaurantId);

        if (!existingRestaurant) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        const emailExists = await R_register.findOne({ email: otherDetails.email, _id: { $ne: restaurantId } });
        if (emailExists) {
            return res.status(400).json({ status: false, message: 'Email already exists. Choose a different email.' });
        }

        const phoneExists = await R_register.findOne({ contactNo: otherDetails.contactNo, _id: { $ne: restaurantId } });
        if (phoneExists) {
            return res.status(400).json({ status: false, message: 'Phone number already exists. Choose a different phone number.' });
        }

        if (req.file) { // New file upload
            if (existingRestaurant.rest_bannerImg && fs.existsSync(existingRestaurant.rest_bannerImg)) {
                try {
                    fs.unlinkSync(existingRestaurant.rest_bannerImg);
                    console.log('File deleted successfully');
                } catch (unlinkError) {
                    console.error('Error deleting file:', existingRestaurant.rest_bannerImg, unlinkError);
                }
            }
            updatedRestaurant = await R_register.findOneAndUpdate({ _id: restaurantId }, {
                ...req.body,
                rest_bannerImg: req.file && req.file.filename,
                updatedAt: modified_date,
            }, { new: true }).lean();
        
            console.log('with');
        } else { // No new file upload
            updatedRestaurant = await R_register.findOneAndUpdate({ _id: restaurantId }, {
                ...req.body,
                photo: existingRestaurant.rest_bannerImg,
                updatedAt: modified_date,
            }, { new: true }).lean();
        
            console.log('without');
        }
        return res.status(200).json({
            status: true,
            message: 'Restaurant updated successfully',
            data: [updatedRestaurant],
        });
        
    } catch (err) {
 
        if (req.file) {
            fs.unlinkSync(req.file.path);
            console.error('Error deleting uploaded file:', req.file.path, err);
        }
        console.log(err);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.DeleteRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        
        const existingRestaurant = await R_register.findById(restaurantId);

        if (!existingRestaurant) {
            return res.status(400).json({
                status: false,
                message: 'Restaurant not found',
            });
        }
        existingRestaurant.isDeleted = true;
        await existingRestaurant.save();

        return res.status(200).json({
            status: true,
            message: 'Restaurant deleted successfully',
        });
    } catch (error) {
        console.error("Error in DeleteRestaurant:", error);

        return res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

