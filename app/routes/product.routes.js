module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create a new Product
    app.post('/products/create', products.create);

    // Retrieve all Products
    app.get('/products', products.findAll);

    // Update a Product with id
    app.put('/products/:id/update_quantity/', products.update);

    // Delete a Product with id
    app.delete('/products/:id', products.delete);
}