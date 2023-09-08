const productQueryParams = {
    sort: {
        asc: { priceSale: 'asc' },
        desc: { priceSale: 'desc' },
        newest: { createdAt: 'desc' },
        latest: { createdAt: 'asc' },
        total_sales: { totalSales: 'desc' },
        default: { totalSales: 'desc' },
    },
    status: {
        deleted: { deleted: true },
        disabled: { disabled: true, deleted: false },
        not_disabled: { disabled: false, deleted: false },
        all: { deleted: false },
        default: { disabled: false, deleted: false },
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
const validateConstants = function (reference, constant, constantField) {
    constantField = constantField ? constantField.toString().trim().toLowerCase() : '';
    return reference[constant].hasOwnProperty(constantField)
        ? reference[constant][constantField]
        : reference[constant]['default'];
};

export { productQueryParams, orderQueryParams, categoryQueryParams, userQueryParams, validateConstants };
