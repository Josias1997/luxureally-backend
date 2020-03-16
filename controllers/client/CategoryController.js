const Category = require('./../../models/Category');
const Restaurant = require('./../../models/Restaurant');
const Food = require('./../../models/Food');

const getCategories = (req, res) => {
    Category.find({})
        .sort({title: 1})
        .populate('restaurant')
        .populate('foods')
        .then(categories => {
            res.status(200).json(categories);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
}

const getCategory = (req, res) => {
    Category.findById(req.params.id)
        .populate('restaurant')
        .populate('foods')
        .then(category => {
            res.status(200).json(category)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const addCategory = (req, res) => {
    let newCategory = new Category(req.body);
    newCategory.image = `/images/${req.file.originalname}`;
    newCategory.save().then(category => {
        Restaurant.findById(category.restaurant).then(restaurant => {
            restaurant.categories.push(category._id)
            restaurant.save().then(restaurant => {
                console.log(restaurant.categories);
            })
        })
        res.json(category);
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const updateCategory = (req, res) => {
    let category = new Category(req.body);
    category._id = req.params.id;
    category.image = `/images/${req.file.originalname}`;
    Category.findByIdAndUpdate(req.params.id, category)
        .then(category => {
            res.json(category)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            Restaurant.findById(category.restaurant).then(restaurant => {
                restaurant.categories.pull(category._id)
                restaurant.save().then(restaurant => {
                    console.log(restaurant.categories);
                })
            });
            category.foods.map(id => {
                Food.findByIdAndDelete(id).exec();
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

const deleteAllCategories = (req, res) => {
    Category.remove({}).then(() => {
        res.json({success: true})
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const getCategoriesByRestaurantId = (req, res) => {
    Category.find({restaurant: req.params.id})
        .populate('restaurant')
        .populate('foods')
        .then(categories => {
            res.status(200).json(categories)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};


module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByRestaurantId
}