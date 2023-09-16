const productQueryParams = {
    sort: {
        asc: { price: 'asc' },
        desc: { price: 'desc' },
        newest: { createdAt: 'desc' },
        latest: { createdAt: 'asc' },
        total_sales: { totalSales: 'desc' },
        default: { totalSales: 'desc' },
    },
    status: {
        disabled: { disabled: true },
        not_disabled: { disabled: false },
        all: {},
        default: { disabled: false },
    },
};

const commentQueryParams = {
    date: {
        newest: { createdAt: 'desc' },
        latest: { createdAt: 'asc' },
        default: { createdAt: 'desc' },
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false },
    },
};

const orderQueryParams = {
    sort: {
        newest: { createdAt: 'desc' },
        latest: { createdAt: 'asc' },
        default: { createdAt: 'desc' },
    },
    status: {
        placed: { status: 'placed' },
        confirm: { status: 'confirm' },
        delivering: { status: 'delivering' },
        delivered: { status: 'delivered' },
        paid: { statusHistory: { $elemMatch: { status: 'paid' } } },
        unpaid: { statusHistory: { $elemMatch: { status: { $ne: 'paid' } } } },
        completed: { status: 'completed' },
        cancelled: { status: 'cancelled' },
        default: {},
    },
};
const categoryQueryParams = {
    date: {
        newest: { createdAt: 'desc' },
        latest: { createdAt: 'asc' },
        default: { createdAt: 'desc' },
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false },
    },
};
const userQueryParams = {
    date: {
        newest: { createdAt: 'desc' },
        latest: { createdAt: 'asc' },
        default: { createdAt: 'desc' },
    },
    status: {
        disabled: { isDisabled: true },
        notDisabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false },
    },
};
const priceRangeFilter = (minPrice, maxPrice) => {
    if (minPrice >= 0 && maxPrice > 0) {
        if (minPrice > maxPrice) {
            const temp = minPrice;
            minPrice = maxPrice;
            maxPrice = temp;
        }
        return { priceSale: { $gte: minPrice, $lte: maxPrice } };
    }
    return {};
};
const validateConstants = function (reference, constant, constantField) {
    constantField = constantField ? constantField.toString().trim().toLowerCase() : '';
    return reference[constant].hasOwnProperty(constantField)
        ? reference[constant][constantField]
        : reference[constant]['default'];
};

export {
    productQueryParams,
    orderQueryParams,
    categoryQueryParams,
    userQueryParams,
    validateConstants,
    priceRangeFilter,
};
