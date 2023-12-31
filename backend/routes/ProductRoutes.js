import express from 'express';
import Product from '../models/ProductModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const ProductRouter = express.Router();

ProductRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

const PAGE_SIZE = 3;

ProductRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countProducts = await Product.countDocuments();
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);

ProductRouter.get('/search', expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const searchQuery = query.query || '';
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const brand = query.brand || '';

    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        name: {
            $regex: searchQuery, // regex is used to search for the query in the name of the product and the description of the product as well as based on many other filters
            $options: 'i' // case insensitive
        }
    } : {};

    const categoryFilter = category && category !== 'all' ? {
        category
    } : {};

    const ratingFilter = rating && rating !== 'all' ? {
        rating: {
            $gte: Number(rating) // $gte is used to search for the rating greater than or equal to the rating
        }
    } : {};

    const priceFilter = price && price !== 'all' ? {
        price: {
            $gte: Number(price.split('-'[0])), // $gte is used to search for the price greater than or equal to the price
            $lte: Number(price.split('-'[1])) // $lte is used to search for the price less than or equal to the price
            // consider the price as a range as 1-50 or 100-200 then price will be split as 1 or 100 and 50 or 200 respectively to get the min and max price like 1 or 100 is $gte and 50 or 200 is $lte
        }
    } : {};

    const sortOrder = order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
            ? { price: 1 } // 1 is ascending order and -1 is descending order 
            : order === 'highest'
                ? { price: -1 }
                : order === 'toprated'
                    ? { rating: -1 }
                    : order === 'newest'
                        ? { createdAt: -1 }
                        : { _id: -1 }

    const products = await Product.find({
        ...queryFilter,
        ...categoryFilter, // category filter is used to search for the category of the product
        ...ratingFilter,
        ...priceFilter
    })
        .sort(sortOrder) // sort the products based on the order
        .skip((page - 1) * pageSize) // pagination
        .limit(pageSize); // pagination
    const countProducts = await Product.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...ratingFilter,
        ...priceFilter
    })
    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize)
    }); // send the products to the client side
}));

ProductRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}))

ProductRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

ProductRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

export default ProductRouter;
