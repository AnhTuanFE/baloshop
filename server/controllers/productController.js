import Product from '../models/ProductModel.js';
import Order from '../models/OrderModel.js';
import Cart from '../models/CartModel.js';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { validateConstants, productQueryParams, priceRangeFilter } from '../utils/searchConstants.js';
const getProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 12;
    const rating = parseInt(req.query.rating) >= 0 && parseInt(req.query.rating) <= 5 ? parseInt(req.query.rating) : 0;
    const maxPrice = parseInt(req.query.maxPrice) > 0 ? parseInt(req.query.maxPrice) : null;
    const minPrice = parseInt(req.query.minPrice) >= 0 ? parseInt(req.query.minPrice) : null;
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const sortBy = validateConstants(productQueryParams, 'sort', req.query.sortBy || 'default');
    let statusFilter = validateConstants(productQueryParams, 'status', 'default');
    let search = {};
    if (req.query.keyword) {
        search.name = {
            $regex: req.query.keyword,
            $options: 'i',
        };
    }
    if (req.query.category) {
        search.category = req.query.category;
    }
    if (rating) {
        search.rating = { $gte: rating };
    }

    const productFilter = {
        ...search,
        ...statusFilter,
        ...priceRangeFilter(minPrice, maxPrice),
    };
    const count = await Product.countDocuments({ ...productFilter });
    let countReal = count - 2;
    if (count == 0) {
        res.json({ products: [], page: 0, pages: 0, total: 0 });
    }
    let products = await Product.find({ ...productFilter })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort(sortBy)
        .populate('category');

    res.status(200).json({ products, page, pages: Math.ceil(count / limit), total: countReal });
};

const getAllProductComment = async (req, res) => {
    let commentArr = [];
    const products = await Product.find({})
        .sort({ _id: -1 })
        .populate('comments.user', 'name image')
        .populate('comments.commentChilds.user', 'name image')
        .populate('image');
    const filterProduct = products.filter((product) => product.comments != '');
    for (let i = 0; i < filterProduct.length; i++) {
        // ...filterProduct[i].image
        commentArr.push(...filterProduct[i].comments);
    }
    const commentSort = commentArr.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    res.json(commentSort);
};

const getProductsByAdmin = async (req, res) => {
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 12;
    const rating = parseInt(req.query.rating) >= 0 && parseInt(req.query.rating) <= 5 ? parseInt(req.query.rating) : 0;
    const maxPrice = parseInt(req.query.maxPrice) > 0 ? parseInt(req.query.maxPrice) : null;
    const minPrice = parseInt(req.query.minPrice) >= 0 ? parseInt(req.query.minPrice) : null;
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const sortBy = validateConstants(productQueryParams, 'sort', req.query.sortBy || 'default');
    let statusFilter = validateConstants(productQueryParams, 'status', req.query.status || 'default');
    let search = {};
    if (req.query.keyword) {
        search.name = {
            $regex: req.query.keyword,
            $options: 'i',
        };
    }
    if (req.query.category) {
        search.category = req.query.category;
        // .toString()
    }
    if (rating) {
        search.rating = { $gte: rating };
    }

    const productFilter = {
        ...search,
        ...statusFilter,
        ...priceRangeFilter(minPrice, maxPrice),
    };
    const count = await Product.countDocuments({ ...productFilter });
    let countReal = count - 2;
    if (count == 0) {
        res.json({ products: [], page: 0, pages: 0, total: 0 });
    }
    let products = await Product.find({ ...productFilter })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort(sortBy)
        .populate('category');

    res.status(200).json({ products, page, pages: Math.ceil(count / limit), total: countReal });
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('reviews.user', 'name image')
        .populate('comments.user', 'name image')
        .populate('comments.commentChilds.user', 'name image');
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
};

const reviewProduct = async (req, res) => {
    const { rating, comment } = req.body;
    let color = '';
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Sản phẩm không tồn tại');
    }
    const order = await Order.findOne({
        user: req.user._id,
        status: 'completed',
        'orderItems.product': product._id,
        'orderItems.isAbleToReview': true,
    });
    if (!order) {
        res.status(400);
        throw new Error('Bạn cần mua sản phẩm này để có thể đánh giá nó');
    }
    order.orderItems.map((orderItem, index) => {
        if (orderItem.product.toString() == product._id.toString()) {
            order.orderItems[index].isAbleToReview = false;
            color = order.orderItems[index].color;
        }
    });

    const review = {
        name: req.user.name,
        rating: Number(rating),
        color,
        comment,
        user: req.user._id,
    };
    product.reviews.push(review);
    product.rating =
        product.reviews.reduce((previousValue, currentReview) => previousValue + currentReview.rating, 0) /
        product.reviews.length;

    await Promise.all([product.save(), order.save()]);

    res.status(201).json({ message: 'Đánh giá thành công' });
};

const commentProduct = async (req, res) => {
    const { nameProduct, imageProduct, question } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const comment = {
            name: req.user.name,
            nameProduct,
            imageProduct,
            idProduct: req.params.id,
            question,
            user: req.user._id,
        };
        product.comments.push(comment);
        product.numComments = product.comments.length;

        await product.save();
        res.status(201).json({ message: 'Comment Add Success' });
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
};

const replyComment = async (req, res) => {
    const { questionChild, idComment } = req.body;
    const product = await Product.findById(req.params.id);
    const commentUsers = product.comments;
    const findComment = commentUsers.find((commentUser) => commentUser._id == idComment);
    if (product) {
        const commentChild = {
            name: req.user.name,
            questionChild,
            user: req.user._id,
        };
        findComment.commentChilds.push(commentChild);

        await product.save();
        res.status(201).json({ message: 'CommentChild Add Success' });
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
};
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const listImage = product?.image;
    if (product) {
        await Cart.updateMany({}, { $pull: { cartItems: { product: req.params.id } } });
        await product.remove();
        res.json({ message: 'Product deleted' });
        // res.json(newCart);
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
};

const deleteProductOption = async (req, res) => {
    const { optionId } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.optionColor = product?.optionColor.filter((option) => option._id != optionId);
        await product.save();
        res.json({ message: 'Đã xóa thành công' });
    } else {
        res.status(404);
        throw new Error('Không có thông tin');
    }
};

const addProduct = async (req, res) => {
    const { name, price, description, category } = req.body;
    const imagePath = req.file.path;

    const productExist = await Product.findOne({ name });
    if (price <= 0) {
        res.status(400);
        throw new Error('Price is not valid, please correct it and try again');
    }
    if (productExist) {
        res.status(400);
        throw new Error('Product name already exist');
    } else {
        cloudinary.v2.uploader.upload(imagePath, { folder: 'baloshopImage' }, async function (err, result) {
            if (err) {
                req.json(err.message);
            }
            req.body.image = result.secure_url;
            req.body.imageId = result.public_id; //name image trong cloudinary

            const product = new Product({
                name,
                price,
                description,
                category,
                // image: { urlImage: req.body.image, nameCloudinary: req.body.imageId },
                image: req.body.image,
            });
            if (product) {
                const createdproduct = await Product.create(product);
                res.status(201).json(createdproduct);
            } else {
                res.status(400);
                throw new Error("Invalid product data or Can't upload image");
            }
        });
    }
};
const addProductOption = async (req, res) => {
    const { color, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    const optionColors = product.optionColor;
    const colorExist = optionColors.some((optionColor) => optionColor.color == color);

    if (countInStock <= 0) {
        res.status(400);
        throw new Error('countInStock is not valid, please correct it and try again');
    }
    if (colorExist) {
        res.status(400);
        throw new Error('Product color already exist');
    }
    if (product) {
        const colors = {
            color,
            countInStock,
        };
        optionColors.push(colors);
        await product.save();
        res.status(201).json(optionColors);
    } else {
        res.status(400);
        throw new Error('Invalid product data');
    }
};

const updateProduct = async (req, res) => {
    const { id, name, price, description, category, nameImage } = req?.body;
    const imagePath = req?.file?.path;

    const product = await Product.findById(id);

    if (price <= 0) {
        res.status(400);
        throw new Error('Price or Count in stock is not valid, please correct it and try again');
    }
    if (product) {
        // ko xóa sp khi cập nhập
        // cloudinary.uploader.destroy(nameImage, function (error, result) {
        //     try {
        //         console.log('result = ', result, 'error = ', error);
        //     } catch (err) {
        //         console.log('lỗi = '.err);
        //     }
        // });
        // ===================
        cloudinary.v2.uploader.upload(imagePath, { folder: 'baloshopImage' }, async function (err, result) {
            if (err) {
                req.json(err.message);
            }
            const urlImageCloudinary = result.secure_url;
            const nameImageCloudinary = result.public_id; //name image trong cloudinary
            // ======================
            const filter = { _id: id };
            const update = {
                $set: {
                    name: name,
                    price: price,
                    description: description,
                    category: category,
                    image: [
                        {
                            urlImageCloudinary,
                        },
                    ],
                },
            };
            const updataStatus = await Product.updateOne(filter, update);
            // ======================
            res.json(updataStatus);
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

const updateProductOption = async (req, res) => {
    const { optionId, color, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    const findOption = product.optionColor?.find((option) => option._id == optionId);
    const findColor = product.optionColor?.find((option) => option.color == color);
    if (countInStock <= 0) {
        res.status(400);
        throw new Error('Vui lòng nhập lại số lượng');
    }
    if (findOption.color != findColor?.color) {
        if (color == findColor?.color) {
            res.status(400);
            throw new Error('Màu sắc đã trùng');
        }
    }
    if (findOption) {
        findOption.color = color || findOption.color;
        findOption.countInStock = countInStock || findOption.countInStock;

        await product.save();
        res.json(findOption);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

const deleteImageProduct = async (req, res) => {
    const { imageId } = req.body;
    const product = await Product.findById(req.params.id);
    const listImage = product?.image;
    const finDelete = listImage.find((image) => image.id == imageId);
    if (product) {
        const filterImage = listImage.filter((image) => image.id != imageId);
        product.image = filterImage;
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }
};

const deleteReplyComment = async (req, res) => {
    const { idComment, idCommentChild } = req.body;
    const product = await Product.findById(req.params.id);
    const findComment = product.comments.find((comment) => comment._id == idComment);
    if (findComment) {
        const findDelete = findComment.commentChilds.filter((commentChild) => commentChild._id != idCommentChild);
        if (findDelete) {
            findComment.commentChilds = findDelete;
            await product.save();
            res.status(201).json('success delete commentChild');
        }
    }
};
const productController = {
    getProducts,
    getAllProductComment,
    getProductsByAdmin,
    getProductById,
    reviewProduct,
    commentProduct,
    replyComment,
    deleteProduct,
    deleteProductOption,
    addProduct,
    addProductOption,
    updateProduct,
    updateProductOption,
    deleteImageProduct,
    deleteReplyComment,
};
export default productController;
