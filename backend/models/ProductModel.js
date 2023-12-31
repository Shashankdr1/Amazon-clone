import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        // Schema whatever was present in data.js

        name : { type : String, required : true, unique: true},
        slug : { type : String, required : true, unique: true},
        image : { type : String, required : true},
        brand : { type : String, required : true},
        category : { type : String, required : true},
        description : { type : String, required : true},
        price : { type : Number, required : true},
        countInStock : { type : Number, required : true},
        rating : { type : Number, required : true},
        numReviews : { type : Number, required : true},
    },
    {
        // options for schema which gets automatically added to above schema
        timestamps : true
    }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
