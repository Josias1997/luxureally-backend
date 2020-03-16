const Food = require('./../../models/Food');
const Category = require('./../../models/Category');

const getFoods = (req, res) => {
    Food.find({})
        .sort({title: 1})
        .populate('category')
        .then(foods => {
            res.render('foods/foods', {foods: foods, user: req.session.user});
        }).catch(err => {
            res.render('foods/foods', {
                error: err.message
            })
        })
}

const getFood = (req, res) => {
    Food.findById(req.params.id)
        .populate('category')
        .then(food => {
            Category.find({}).then(categories => {
                res.render('foods/edit', {food: food, user: req.session.user, categories: categories});
            })
        }).catch(err => {
            res.redirect('/admin/foods/');
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
                res.redirect('/admin/foods/');
            })
        })
    }).catch(err => {
        res.redirect('/admin/foods/')
    })
};

const updateFood = (req, res) => {
    let food = new Food(req.body);
    food._id = req.params.id;
    food.image = `/images/${req.file.originalname}`;
    Food.findByIdAndUpdate(req.params.id, food)
        .then(food => {
            if (food.category !== req.body.category) {
                Category.findById(food.category).then(category => {
                    category.foods.pull(food._id);
                    category.save().then();
                });
                Category.findById(req.body.category).then(category => {
                    category.foods.push(food._id);
                    category.save().then();
                })
            }
            res.redirect('/admin/foods/');
        }).catch(err => {
            res.redirect('/admin/foods/');
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
            res.render('foods/foods', {success: 'Food deleted successfully'});
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        });
};

const getFoodsByCategoryId = (req, res) => {
    Food.find({category: req.params.id})
        .populate('category')
        .then(foods => {
            res.render('foods/foods', {foods: foods});
        }).catch(err => {
        res.render('foods/foods', {
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