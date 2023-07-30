import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import Product from '../Models/ProductModel.js';
import Order from './../Models/OrderModel.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const orderRouter = express.Router();

// API giao hàng tiết kiệm
// const apiBase = 'https://services.giaohangtietkiem.vn';
const apiBase = 'https://services-staging.ghtklab.com';
const Token = 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd';
// CREATE ORDER
const handleConfigProducts = (orderItems) => {
    const products = [];
    for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        const product = {
            name: item.name,
            weight: item.weight || 0.5,
            quantity: item.qty,
            product_code: item.id_product,
        };
        products.push(product);
    }
    return products;
};

orderRouter.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        let id_predefined = uuidv4().slice(0, 24);
        try {
            const {
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                phone,
                name,
                email,
                paypalOrder,
                address_shop,
            } = req.body;
            // const handleCreateOrderGHTK = async (products) => {
            //     const data12 = {
            //         products: products,
            //         order: {
            //             id: id_predefined,
            //             pick_name: 'SHOP BALO',
            //             order_id: id_predefined,
            //             pick_money: 0,
            //             pick_province: address_shop?.city,
            //             pick_district: address_shop?.distric,
            //             pick_address: address_shop?.address,
            //             pick_ward: address_shop?.ward,
            //             pick_tel: address_shop?.phone,
            //             name: name,
            //             tel: phone,
            //             email: email,
            //             address: shippingAddress.address,
            //             province: shippingAddress.city,
            //             district: shippingAddress.distric,
            //             ward: shippingAddress.ward,
            //             hamlet: 'Khác',
            //             value: totalPrice,
            //             transport: 'road',
            //             // is_freeship: '1',
            //             // pick_date: dateString,
            //             // note: 'Khối lượng tính cước tối đa: 1.00 kg',
            //             // pick_option: 'cod', // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
            //             // deliver_option: 'xteam', // nếu lựa chọn kiểu vận chuyển xfast
            //             // pick_session: 2, // Phiên lấy xfast
            //             // booking_id: 2,
            //             // tags: [1, 7],
            //         },
            //     };
            //     const url = `${apiBase}/services/shipment/order`;
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
            //         },
            //     };
            //     const { data } = await axios.post(url, data12, config);
            //     return data;
            // };
            if (orderItems.length != 0) {
                for (let i = 0; i < orderItems.length; i++) {
                    const product = await Product.findById(orderItems[i].product);
                    const findCart = product.optionColor?.find((option) => option.color === orderItems[i].color);
                    if (findCart.countInStock < orderItems[i].qty) {
                        res.status(400);
                        throw new Error('Số lượng không đủ đáp ứng');
                    }
                }
            } else {
                res.status(400);
                throw new Error('Đặt hàng không thành công');
            }
            if (req?.user?.disabled) {
                res.status(400);
                throw new Error('Tài khoản của bạn đã bị khóa');
            }
            if (orderItems && orderItems.length === 0) {
                res.status(400);
                throw new Error('No order items');
            }
            if (paypalOrder?.payerID) {
                const order = new Order({
                    orderItems,
                    user: req.user._id,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    phone,
                    name,
                    email,
                    id_predefined: id_predefined,
                    paypalOrder,
                    waitConfirmation: true,
                    isPaid: true,
                });
                for (const orderItem of orderItems) {
                    const findProduct = await Product.findById(orderItem.product);
                    const optionColor = findProduct?.optionColor;
                    const findColor = optionColor.find((option) => option.color == orderItem.color);
                    const filterOptionColor = optionColor.filter((option) => option.color != orderItem.color);
                    if (findColor) {
                        findColor.color = findColor.color;
                        findColor.countInStock = findColor.countInStock - orderItem.qty;
                    }
                    let arrOption = [...filterOptionColor, findColor];
                    await Product.findOneAndUpdate({ _id: orderItem.product }, { optionColor: arrOption });
                }
                const createOrder = await order.save();
                // const productConfiged = await handleConfigProducts(orderItems);
                // const dataOrderGHTK = await handleCreateOrderGHTK(productConfiged);
                // console.log('dataOrderGHTK paypal = ', dataOrderGHTK);
                // , GHTK_Order: dataOrderGHTK
                res.status(201).json({ ShopOrder: createOrder });
            } else {
                const order = new Order({
                    orderItems,
                    user: req.user._id,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    phone,
                    name,
                    email,
                    id_predefined: id_predefined,
                });
                for (const orderItem of orderItems) {
                    const findProduct = await Product.findById(orderItem.product);
                    const optionColor = findProduct?.optionColor;
                    const findColor = optionColor.find((option) => option.color == orderItem.color);
                    const filterOptionColor = optionColor.filter((option) => option.color != orderItem.color);
                    if (findColor) {
                        findColor.color = findColor.color;
                        findColor.countInStock = findColor.countInStock - orderItem.qty;
                    }
                    let arrOption = [...filterOptionColor, findColor];
                    await Product.findOneAndUpdate({ _id: orderItem.product }, { optionColor: arrOption });
                }
                const createOrder = await order.save();
                // const productConfiged = await handleConfigProducts(orderItems);
                // const dataOrderGHTK = await handleCreateOrderGHTK(productConfiged);
                // , GHTK_Order: dataOrderGHTK
                res.status(201).json({ ShopOrder: createOrder });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }),
);
orderRouter.put(
    '/update_label_ghtk',
    asyncHandler(async (req, res) => {
        try {
            const { idOrder, label_GHTK } = req.body;
            const find_order_by_id_pre = await Order.findById(idOrder);
            // console.log('find_order_by_id_pre = ', find_order_by_id_pre);
            find_order_by_id_pre.label_id_GiaoHangTK = label_GHTK;
            const orderUpdate = await find_order_by_id_pre.save();
            res.status(200).json(orderUpdate);
        } catch (error) {
            res.status(500).json(error);
        }
    }),
);
//UPDATE AMOUNT PRODUCT
orderRouter.put(
    '/returnAmountProduct',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItems } = req.body;
        if (orderItems) {
            for (let i = 0; i < orderItems.length; i++) {
                const findProduct = await Product.findById(orderItems[i].product);
                const optionColor = findProduct?.optionColor;
                const findColor = optionColor.find((option) => option.color == orderItems[i].color);
                const filterOptionColor = optionColor.filter((option) => option.color != orderItems[i].color);
                if (findColor) {
                    findColor.color = findColor.color;
                    findColor.countInStock = findColor.countInStock + orderItems[i].qty;
                }
                let arrOption = [...filterOptionColor, findColor];
                await Product.findOneAndUpdate({ _id: orderItems[i].product }, { optionColor: arrOption });
            }
            res.status(201).json('success');
        }
    }),
);

//CREATE PRODUCT
orderRouter.post(
    '/:id/poductReview',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItemId, rating, comment, name } = req.body;
        const orders = await Order.find({ user: req.user._id });
        const order = orders.find((order) => order.id == req.params.id);
        const findItemProduct = order?.orderItems.find((item) => item._id == orderItemId);
        if (findItemProduct?.productReview.length > 0) {
            res.status(400);
            throw new Error('Bạn đã đánh giá rồi');
        }
        if (rating == '' || comment == '') {
            res.status(400);
            throw new Error('Nhập đầy đủ thông tin');
        }
        if (findItemProduct) {
            const newReview = {
                userName: name,
                rating,
                comment,
            };
            findItemProduct.productReview.push(newReview);
            await order.save();
            res.status(201).json(findItemProduct);
        }
    }),
);

// GET ALL ORDERS
orderRouter.get(
    '/productbestseller',
    // protect,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({});
        const products = await Product.find({}).sort({ _id: -1 });
        let allPay = [];
        let AllOrder = [];
        let Arr = {};
        let ArrQuatity = [];
        for (let order of orders) {
            if (order.isPaid == true) {
                allPay.push(order);
            }
        }
        for (let pay of allPay) {
            for (let paid of pay.orderItems) {
                AllOrder.push(paid);
            }
        }
        for (let i = 0; i < AllOrder.length; i++) {
            if (Arr[AllOrder[i].product] != undefined) Arr[AllOrder[i].product]++;
            else Arr[AllOrder[i].product] = 1;
        }
        let newarr = [];
        ArrQuatity = Object.entries(Arr).sort(function (a, b) {
            return b[1] - a[1];
        });
        for (let i = 0; i < ArrQuatity.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (ArrQuatity[i][0] == products[j]._id) {
                    newarr.push(products[j]);
                    break;
                }
            }
        }
        res.json(newarr);
    }),
);

// ADMIN GET ALL ORDERS
orderRouter.get(
    '/all',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const pageSize = 15;
        const page = Number(req.query.pageNumber) || 1;
        const status = Number(req.query.status) || 0;

        let search = {};
        if (req.query.keyword) {
            search.email = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }
        if (status == 0) {
            search.cancel = 0;
        }
        if (status == 1) {
            search.waitConfirmation = false;
            search.cancel = 0;
        }
        if (status == 2) {
            search.cancel = 0;
            search.waitConfirmation = true;
            search.isDelivered = false;
        }
        if (status == 3) {
            search.cancel = 0;
            search.isDelivered = true;
            search.isPaid = false;
        }
        if (status == 4) {
            search.cancel = 0;
            search.isPaid = true;
            search.completeAdmin = false;
        }
        if (status == 5) {
            search.cancel = 0;
            search.completeUser = true;
            search.completeAdmin = true;
        }
        if (status == 6) {
            search.cancel = 1;
        }
        const count = await Order.countDocuments({ ...search });
        let orders = await Order.find({ ...search })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ _id: -1 })
            .populate('user', 'id name email');

        res.json({ orders, page, pages: Math.ceil(count / pageSize) });
    }),
);

orderRouter.get(
    '/complete',
    protect,
    // admin,
    asyncHandler(async (req, res) => {
        // const orders = await Order.find({ completeAdmin: true }).sort({ _id: -1 });
        const orders = await Order.find({
            isPaid: true,
        }).sort({ _id: -1 });

        if (orders) {
            res.json(orders);
        }
    }),
);

// USER GET ORDERS ITEMS
orderRouter.get(
    '/:id/orderItem',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const orderItems = order?.orderItems;
            res.json(orderItems);
        }
    }),
);

// USER LOGIN ORDERS
orderRouter.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(order);
    }),
);

// GET ORDER BY ID
orderRouter.get(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS PAID
orderRouter.put(
    '/:id/pay',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            // order.orderItems.map((orderItem)=>{
            // const product = await Product.findById(orderItem.product);
            // if(product){
            //     product.numberOfOrder += orderItem.qty;
            //     const updatedProduct = await Product.save();}
            // })
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS WAITCONFIRMATION
orderRouter.put(
    '/:id/waitConfirmation',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { status, address_shop } = req.body;
        const order = await Order.findById(req.params.id);
        const handleCreateOrderGHTK = async (products) => {
            const data12 = {
                products: products,
                order: {
                    id: order._id,
                    pick_name: 'SHOP BALO',
                    pick_money: 0,
                    pick_province: address_shop?.city,
                    pick_district: address_shop?.distric,
                    pick_address: address_shop?.address,
                    pick_ward: address_shop?.ward,
                    pick_tel: address_shop?.phone,
                    name: order.name,
                    tel: order.phone,
                    email: order.email,
                    address: order.shippingAddress.address,
                    province: order.shippingAddress.city,
                    district: order.shippingAddress.distric,
                    ward: order.shippingAddress.ward,
                    hamlet: 'Khác',
                    value: order.totalPrice,
                    transport: 'road',
                    // is_freeship: '1',
                    // pick_date: dateString,
                    // note: 'Khối lượng tính cước tối đa: 1.00 kg',
                    // pick_option: 'cod', // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
                    // deliver_option: 'xteam', // nếu lựa chọn kiểu vận chuyển xfast
                    // pick_session: 2, // Phiên lấy xfast
                    // booking_id: 2,
                    // tags: [1, 7],
                },
            };
            const url = `${apiBase}/services/shipment/order`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: Token,
                },
            };
            const { data } = await axios.post(url, data12, config);
            return data;
        };
        const handleUpdateLabel_id_GHTK = (dataOrderGHTK) => {
            order.label_id_GiaoHangTK = dataOrderGHTK.order.label;
        };
        if (order) {
            if (status) {
                const productConfiged = await handleConfigProducts(order.orderItems);
                const dataOrderGHTK = await handleCreateOrderGHTK(productConfiged);
                await handleUpdateLabel_id_GHTK(dataOrderGHTK);
                order.waitConfirmation = true;
                order.waitConfirmationAt = Date.now();
            }
            // else {
            //     order.waitConfirmation = false;
            //     order.waitConfirmationAt = Date.now();
            // }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS COMMPLETE USER
orderRouter.put(
    '/:id/completeUser',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.completeUser = true;
            order.completeUserAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS COMMPLETE ADMIN
orderRouter.put(
    '/:id/completeAdmin',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.completeAdmin = true;
            order.completeAdminAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS DELIVERED
orderRouter.put(
    '/:id/delivered',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.put(
    '/:id/paid',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.delete(
    '/:id/cancel',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            if (order.isPaid != true) {
                order.cancel = 1;
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.delete(
    '/:id/ucancel',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (req?.user?.disabled) {
            res.status(400);
            throw new Error('account look up');
        }
        if (order != undefined || req.user._id == order.user) {
            if (order.isDelivered != true) {
                const url = `${apiBase}/services/shipment/cancel/${order.label_id_GiaoHangTK}`;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                    },
                };
                const { data } = await axios.post(url, config);
                if (data) {
                    order.cancel = 1;
                    const updatedOrder = await order.save();
                    res.json(updatedOrder);
                }
            } else {
                res.status(404);
                throw new Error('Can not cancel');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);
orderRouter.get(
    '/:id/address',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.params.id });

        if (order) {
            res.json(order[order.length - 1].shippingAddress);
        } else {
            res.status(404);
            throw new Error('Not found order of user');
        }
    }),
);

export default orderRouter;
