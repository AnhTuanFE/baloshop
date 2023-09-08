import Product from '../models/ProductModel.js';
import Order from '../models/OrderModel.js';
import Cart from '../models/CartModel.js';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

const getProducts = async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const rating = Number(req.query.rating) || 0;
    const maxPrice = Number(req.query.maxPrice) || 0;
    const minPrice = Number(req.query.minPrice == 0 ? 1 : req.query.minPrice) || 0;
    const sortProducts = Number(req.query.sortProducts) || 1;
    let search = {},
        sort = {};
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
    if (maxPrice && minPrice) {
        search.price = {
            $gte: minPrice,
            $lte: maxPrice,
        };
    }
    if (sortProducts == 1) sort.createdAt = -1;
    // if (sortProducts == 2) sort.numberOfOrder =-1;
    if (sortProducts == 3) sort.price = 1;
    if (sortProducts == 4) sort.price = -1;

    const count = await Product.countDocuments({ ...search });
    let products = await Product.find({ ...search })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort(sort);

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const getAllProduct = async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    const productSlice = products.slice(0, 10);
    res.json(productSlice);
};
const getAllProductComment = async (req, res) => {
    let commentArr = [];
    const products = await Product.find({}).sort({ _id: -1 }).populate('comments.user', 'name image');
    const filterProduct = products.filter((product) => product.comments != '');
    for (let i = 0; i < filterProduct.length; i++) {
        commentArr.push(...filterProduct[i].comments);
    }
    const commentSort = commentArr.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    res.json(commentSort);
};
const getProductComment = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('comments.user', 'name image');
    const allComments = product?.comments?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    if (allComments == undefined) {
        res.status(400);
        throw new Error('Sản phẩm không tồn tại');
    } else {
        res.json(allComments);
    }
};

const getAllReview = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name image');
    const allReview = product?.reviews?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    if (allReview == undefined) {
        res.status(400);
        throw new Error('Sản phẩm không tồn tại');
    } else {
        res.json(allReview);
    }
};
const getProductsByAdmin = async (req, res) => {
    const pageSize = 15;
    const page = Number(req.query.pageNumber) || 1;
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
    const count = await Product.countDocuments({ ...search });
    const products = await Product.find({ ...search })
        .populate(`category`)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize), countProducts: count });
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
};

const reviewProduct = async (req, res) => {
    const { rating, color, comment, name } = req.body;
    const product = await Product.findById(req.params.id);
    const order = await Order.find({ user: req.user._id });
    let listOrder = [];
    if (rating == '' || color == '' || comment == '') {
        res.status(400);
        throw new Error(` Vui lòng nhập đầy đủ thông tin`);
    }
    if (order) {
        for (let i = 0; i < order.length; i++) {
            if (order[i].isPaid == true) {
                listOrder = [...listOrder, ...order[i].orderItems];
            }
        }
        if (listOrder.filter((i) => i.product == req.params.id).length == 0) {
            res.status(400);
            throw new Error(`Không thể đánh giá`);
        }
    }
    if (product) {
        const numOrderUser = listOrder.filter((i) => i.product == req.params.id).length;
        const alreadyReviewed = product.reviews.filter((r) => r.user.toString() === req.user._id.toString()).length;
        if (alreadyReviewed >= numOrderUser) {
            res.status(400);
            throw new Error('Sản phẩm đã được đánh giá');
        }
        const review = {
            name: name,
            rating: Number(rating),
            color,
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Reviewed Added' });
    } else {
        res.status(404);
        throw new Error('Product not Found');
    }
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
        cloudinary.v2.uploader.upload(imagePath, { folder: 'baloshopImage' }, function (err, result) {
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
                image: { urlImage: req.body.image, nameCloudinary: req.body.imageId },
                id_product: id_product,
                // user: req.user._id,
            });
            if (product) {
                const createdproduct = Product.create(product);
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
    // console.log('data = ', req.body);
    // console.log('imagePath = ', imagePath);

    const product = await Product.findById(id);

    if (price <= 0) {
        res.status(400);
        throw new Error('Price or Count in stock is not valid, please correct it and try again');
    }
    if (product) {
        cloudinary.uploader.destroy(nameImage, function (error, result) {
            try {
                console.log('result = ', result, 'error = ', error);
            } catch (err) {
                console.log('lỗi = '.err);
            }
        });
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
                            urlImage: urlImageCloudinary,
                            nameCloudinary: nameImageCloudinary,
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
    getAllProduct,
    getAllProductComment,
    getProductComment,
    getAllReview,
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
