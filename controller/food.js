const Food = require("../model/food");

const createFood = async (req, res) => {
    try {

        const { name, price, description, category, whight, foodImage } = req.body;
        const newFood = new Food({
            name, price, description, category, whight, foodImage
        });
        const saveFood = await newFood.save();
        console.log(saveFood)
        res.status(200).json({
            message: `Food successfuly added`,
            success: true,
            data: saveFood


        });

    } catch (error) {
        console.log(error)
        res.status(500).json({

            message: "add food faild",
            success: false,
        });
    }
};

const getAllFoods = async (req, res) => {
    try {
        const { category } = req.query;

        if (category === 'All') {
            const foodItems = await Food.find()


            res.status(200).json({
                message: `retrn Food successfuly`,
                success: true,
                data: {
                    food: foodItems,
                },
            });
        } else {
            const foodItems = await Food.find({ category: category })


            res.status(200).json({
                message: `retrn Food successfuly`,
                success: true,
                data: {
                    food: foodItems,
                },
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: `Internal server error`,
            success: false,
        });
    }
}
const getNewFood = async (req, res) => {
    try {



        const foodItems = await Food.find().sort({ createdAt: -1 }).limit(12);


        res.status(200).json({
            message: `12 register foods showing`,
            success: true,
            data: {
                food: foodItems,
            },
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: `Internal server error`,
            success: false,
        });
    }
}
const getFoodsFromDistinctCatagory = async (req, res) => {
    try {
        const distinctCatagory = await Food.distinct("category");
        const distinctfood = await Promise.all(
            distinctCatagory.slice(0, 4).map(async (category) => {
                const food = await Food.findOne({ category });
                return food;
            })
        )


        res.status(200).json({
            message: `4 different category food`,
            success: true,
            data: {
                food: distinctfood,
            },
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: `Internal server error`,
            success: false,
        });
    }
}
const getTopRating = async (req, res) => {
    try {
        const topRatedFoods = await Food.find().sort({ 'reviwes.rating': -1 }).limit(4);



        res.status(200).json({
            message: `4 different category food`,
            success: true,
            data: {
                food: topRatedFoods,
            },
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: `Internal server error`,
            success: false,
        });
    }
}

const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;

        const foodItems = await Food.findById(id);



        res.status(200).json({
            message: `Food details`,
            success: true,
            data: {
                food: foodItems,
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: `Internal server error`,
            success: false,
        });
    }
}





module.exports = { createFood, getAllFoods, getFoodById, getNewFood, getFoodsFromDistinctCatagory, getTopRating};