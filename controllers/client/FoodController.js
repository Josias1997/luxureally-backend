const Food = require('./../../models/Food');
const Category = require('./../../models/Category');

const getFoods = (req, res) => {
    Food.find({})
        .sort({title: 1})
        .populate('category')
        .then(foods => {
            res.status(200).json(foods);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
}

const getFood = (req, res) => {
    Food.findById(req.params.id)
        .populate('category')
        .then(food => {
            res.status(200).json(food)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const addFood = (req, res) => {
    let newFood = new Food(req.body);
    newFood.image = `/images/${req.file.originalname}`;
    newFood.save().then(food => {
        Category.findById(food.category)
        .then(category => {
            category.foods.push(food._id);
            category.save().then(category => {
                console.log(category.foods);
            })
        })
        res.json(food);
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const updateFood = (req, res) => {
    let food = new Category(req.body);
    food._id = req.params.id;
    food.image = `/images/${req.file.originalname}`;
    Food.findByIdAndUpdate(req.params.id, food)
        .then(food => {
            res.json(food)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const deleteFood = (req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then((food) => {
            Category.findById(food.category).then(category => {
                category.foods.pull(food._id);
                category.save().then(category => {
                    console.log(category.foods);
                })
            })
            res.json({success: true})
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const getFoodsByCategoryId = (req, res) => {
    Food.find({category: req.params.id})
        .populate('category')
        .then(foods => {
            res.status(200).json(foods)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};


module.exports = {
    getFoods,
    getFood,
    addFood,
    updateFood,
    deleteFood,
    getFoodsByCategoryId
}