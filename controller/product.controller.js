const { Router } = require('express');
const productService = require('../service/product.service');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const productData = await productService.getProductById(productId);
        res.send(productData);
    } catch (error) {
        console.error(`Error in fetching product: ${error.message}`);
        res.status(500).send(`Error in fetching product: ${error.message}`);
    }
});

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.send(products);
    } catch (error) {
        console.error(`Error in fetching products: ${error.message}`);
        res.status(500).send(`Error in fetching products: ${error.message}`);
    }
});

/**
 * @swagger
 * /product/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await productService.deleteProduct(productId);
        res.send("Product deleted successfully");
    } catch (error) {
        console.error(`Error in deleting product: ${error.message}`);
        res.status(500).send(`Error in deleting product: ${error.message}`);
    }
});

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productService.addProduct(newProduct);
        res.send(createdProduct);
    } catch (error) {
        console.error(`Error in adding product: ${error.message}`);
        res.status(500).send(`Error in adding product: ${error.message}`);
    }
});

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.put('/', async (req, res) => {
    try {
        const updatedProduct = req.body;
        const updatedData = await productService.updateProduct(updatedProduct);
        res.send(updatedData);
    } catch (error) {
        console.error(`Error in updating product: ${error.message}`);
        res.status(500).send(`Error in updating product: ${error.message}`);
    }
});

module.exports = router;
