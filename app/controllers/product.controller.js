const Product = require('../models/product.model.js');

// Create and Save a new Product
exports.create = (req, res) => {

    console.log(req.body)


    if(!req.body.quantity) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name ,
        quantity: req.body.quantity
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });

};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {

    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });

};


// Update a product identified by the product Id in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.quantity) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        quantity: parseInt(req.body.quantity) + parseInt(req.query.number)
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.id
        });
    });

};

// Delete a product the specified product Id in the request
exports.delete = (req, res) => {

    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.id
        });
    });

};