const Category = require('./../../models/Category');
const Restaurant = require('./../../models/Restaurant');
const Food = require('./../../models/Food');

const getCategories = (req, res) => {
    Category.find({})
        .sort({created_at: -1})
        .populate('restaurant')
        .populate('foods')
        .then(categories => {
            res.render('categories/categories', {categories: categories, user: req.session.user});
        }).catch(err => {
            res.render('categories/categories', {
                error: err.message
            })
        })
}

const getCategory = (req, res) => {
    Category.findById(req.params.id)
        .populate('restaurant')
        .populate('foods')
        .then(category => {
            Restaurant.find({}).then(restaurants => {
                res.render('categories/edit', {category: category, user: req.session.user, restaurants: restaurants});
            });
        }).catch(err => {
            res.render('categories/categories', {
                error: err.message
            })
        })
};

const addCategory = (req, res) => {
    console.log(req.body);
    let newCategory = new Category(req.body);
    newCategory.image = `/images/${req.file.originalname}`;
    newCategory.save().then(category => {
        Restaurant.findById(category.restaurant).then(restaurant => {
            restaurant.categories.push(category._id)
            restaurant.save().then(restaurant => {
                res.redirect('/admin/categories/');
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        res.redirect('/admin/categories/');
    })
};

const updateCategory = (req, res) => {
    let category = new Category(req.body);
    category._id = req.params.id;
    category.image = `/images/${req.file.originalname}`;
    Category.findByIdAndUpdate(req.params.id, category)
        .then(category => {
            if (category.restaurant !== req.body.restaurant) {
                Restaurant.findById(category.restaurant).then(restaurant => {
                    restaurant.categories.pull(category._id);
                    restaurant.save().then();
                });
                Restaurant.findById(req.body.restaurant).then(restaurant => {
                    restaurant.categories.push(category._id);
                    restaurant.save().then();
                });
            }
            res.redirect('/admin/categories/');
        }).catch(err => {
            res.redirect('/admin/categories/');
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
            res.render('categories/categories', {sucess: 'Category deleted successfully'});
        }).catch(err => {
            res.render('categories/categories', {
                error: err.message
            })
        });
};

const deleteAllCategories = (req, res) => {
    Category.remove({}).then(() => {
        res.render('categories/categories', {sucess: 'Categories deleted successfully'});
    }).catch(err => {
        res.render('categories/categories', {
            error: err.message
        })
    })
};

const getCategoriesByRestaurantId = (req, res) => {
    Category.find({restaurant: req.params.id})
        .populate('restaurant')
        .populate('foods')
        .then(categories => {
            res.render('categories/categories', {categories: 'categories'});
        }).catch(err => {
            res.render('categories/categories', {
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