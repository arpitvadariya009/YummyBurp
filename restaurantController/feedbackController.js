const feedback = require('../models/feedbackModel');

exports.restaurantsReviews = async (req, res) => {
    try {
        const { userId, restaurant_id, feedback_message, rating } = req.body;

        const RestaurantsReview = await feedback.create({
            userId,
            restaurant_id,
            feedback_message,
            rating,
        })
        if (!RestaurantsReview) {

            return res.status(400).json({ status: false, message: "Failed to add review" })
        }
        return res.status(200).json({ status: true, message: "review added", data: RestaurantsReview })

    } catch (error) {

        return res.status(500).json({ status: false, message: error.message });
    }
}