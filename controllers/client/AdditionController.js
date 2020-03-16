const Addition = require('./../../models/Addition');
const Table = require('./../../models/Table');

const getAdditions = (req, res) => {
    Addition.find({})
        .sort({created_at: -1})
        .populate('table')
        .then(additions => {
            res.status(200).json(additions);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
    })

}

const getAddition = (req, res) => {
    Addition.findById(req.params.id)
        .populate('table')
        .then(addition => {
            res.status(200).json(addition)
        }).catch(err => {
            res.status(404).json({
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
                console.log(table.additions);
            })
        });
        res.json(addition);
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })

};

const updateAddition = (req, res) => {
    Addition.findByIdAndUpdate(req.params.id, req.body)
        .then(addition => {
            res.json(addition)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
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
            res.json({success: true})
        })
        .catch(err => {
            res.status(404).json({
                error: err.message
            })
        })

};

const getAdditionsByTableId = (req, res) => {
    Addition.find({table: req.params.id, status: 'NON PAID'})
        .populate('table')
        .then(additions => {
            res.status(200).json(additions);
        }).catch(err => {
            res.status(404).json({
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