const Product = require('../moudels/product.moudels');

const getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }
        console.log('Product fetched from MongoDB');
        return product;
    } catch (error) {
        console.error(`Error in fetching product: ${error.message}`);
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        const products = await Product.find();
        console.log('Products fetched from MongoDB');
        return products;
    } catch (error) {
        console.error(`Error in fetching products: ${error.message}`);
        throw error;
    }
};

const addProduct = async (newProduct) => {
    try {
        const product = new Product(newProduct);
        const savedProduct = await product.save();
        console.log("Product successfully added to MongoDB");
        return savedProduct;
    } catch (error) {
        console.error(`Error in adding product: ${error.message}`);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }
        console.log("Product successfully deleted from MongoDB");
        return product;
    } catch (error) {
        console.error(`Error in deleting product: ${error.message}`);
        throw error;
    }
};

const updateProduct = async (updatedProduct) => {
    try {
        const { _id, ...rest } = updatedProduct;
        const product = await Product.findByIdAndUpdate(_id, rest, { new: true });
        if (!product) {
            throw new Error(`Product with ID ${_id} not found`);
        }
        console.log("Product successfully updated in MongoDB");
        return product;
    } catch (error) {
        console.error(`Error in updating product: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getProductById,
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};
