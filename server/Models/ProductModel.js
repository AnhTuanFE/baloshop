import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        color: { type: String, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

//comment childs
const commentChildsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        questionChild: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

//comment
const commentSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        nameProduct: { type: String, required: true },
        imageProduct: { type: String },
        idProduct: { type: String, required: true },
        question: { type: String, required: true },
        commentChilds: [commentChildsSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);
//color
const optionColorSchema = mongoose.Schema(
    {
        color: { type: String, required: true },
        weight: { type: Number, required: true, default: 1 },
        countInStock: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    },
);
//product
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        // sku: {
        //     type: Number,
        //     // required: true,
        // },
        image: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        comments: [commentSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        numComments: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        optionColor: [optionColorSchema],
        totalSales: {
            type: Number,
            default: 0,
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
