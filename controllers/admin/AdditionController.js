const Addition = require('./../../models/Addition');
const Table = require('./../../models/Table');

const getAdditions = (req, res) => {
    Addition.find({})
        .sort({created_at: -1})
        .populate('table')
        .then(additions => {
            res.render('additions/additions', {additions: additions, user: req.session.user});
        }).catch(err => {
            res.render('additions/additions', {
                error: err.message
            })
    })

}

const getAddition = (req, res) => {
    Addition.findById(req.params.id)
        .populate('table')
        .then(addition => {
            Table.find({}).then(tables => {
                res.render('additions/edit', {addition: addition, user: req.session.user, tables: tables});
            });
        }).catch(err => {
            res.render('additions/additions', {
                error: err.message
            })
    })

};

const addAddition = (req, res) => {
    let newAddition = new Addition(req.body);
    newAddition.save().then(addition => {
        Table.findById(addition.table).then(table => {
            table.additions.push(addition._id);
            table.save().then(table => {
                res.redirect('/admin/additions/');
            })
        });
    }).catch(err => {
        res.redirect('/admin/additions/');
    })

};

const updateAddition = (req, res) => {
    Addition.findByIdAndUpdate(req.params.id, req.body)
        .then(addition => {
            if (addition.table !== req.body.table) {
                Table.findById(addition.table).then(table => {
                    table.additions.pull(addition._id);
                    table.save().then();
                });
                Table.findById(req.body.table).then(table => {
                    table.additions.push(addition._id);
                    table.save().then();
                });
            }
            res.redirect('/admin/additions/');
        }).catch(err => {
            res.redirect('/admin/additions/')
    })

};

const deleteAddition = (req, res) => {
    Addition.findByIdAndDelete(req.params.id)
        .then((addition) => {
            Table.findById(addition.table).then(table => {
                table.additions.pull(addition._id);
                table.save().then(table => {
                    console.log(table.additions);
                })
            });
            res.render(req.params.next, {success: 'Addition deleted successfully'});
        })
        .catch(err => {
            res.render(req.params.next, {
                error: err.message
            })
        })

};

const getAdditionsByTableId = (req, res) => {
    Addition.find({table: req.params.id})
        .populate('table')
        .then(additions => {
            res.render(req.params.next, {additions: additions});
        }).catch(err => {
            res.render(req.params.next, {
                error: err.message
            })
        })
};


module.exports = {
    getAdditions,
    getAddition,
    addAddition,
    updateAddition,
    deleteAddition,
    getAdditionsByTableId
}