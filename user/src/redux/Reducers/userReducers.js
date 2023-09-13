import * as types from '../Constants/UserContants';

// LOGIN
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_LOGIN_REQUEST:
            return { loading: true };
        case types.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case types.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case types.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

// REGISTER
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_REGISTER_REQUEST:
            return { loading: true };
        case types.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case types.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case types.USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case types.USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload, success: true };
        case types.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case types.USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case types.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case types.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case types.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};
// UPDATE PROFILE
export const userUpdatePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_UPDATE_PASSWORD_REQUEST:
            return { loading: true };
        case types.USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, data: action.payload };
        case types.USER_UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case types.USER_UPDATE_PASSWORD_RESET:
            return {};
        default:
            return state;
    }
};

// CREATE USER
export const createUserReducer = (state = [], action) => {
    switch (action.type) {
        case types.CREACTE_USER_REQUEST:
            return { loading: true };
        case types.CREACTE_USER_SUCCESS:
            return { loading: false, createUs: action.payload };
        case types.CREACTE_USER_FAIL:
            return { loading: false, error: action.payload };
        case types.CREACTE_USER_RESET:
            return {};
        default:
            return state;
    }
};

// GET PROVINCE
export const ProvinceReducer = (state = { province: [] }, action) => {
    switch (action.type) {
        case types.PROVINCE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.PROVINCE_SUCCESS:
            return {
                loading: false,
                province: action.payload,
            };
        case types.PROVINCE_FAIL:
            return { loading: false, province: [], error: action.payload };
        default:
            return state;
    }
};

// AVATAR
export const Avatarload = (state = { avatar: [] }, action) => {
    switch (action.type) {
        case types.AVATAR_REQUEST:
            return { loading: true, avatar: [] };
        case types.AVATAR_SUCCESS:
            return {
                loading: false,
                avatar: action.payload,
            };
        case types.AVATAR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const userForgotPassWord = (state = {}, action) => {
    switch (action.type) {
        case types.FORGOT_PASS_WORD_REQUEST:
            return { loading: true };
        case types.FORGOT_PASS_WORD_SUCCESS: {
            return { loading: false, success: true, data: action.payload };
        }
        case types.FORGOT_PASS_WORD_FAIL: {
            return { loading: false, error: action.payload };
        }
        case types.FORGOT_PASS_WORD_RESET: {
            return {};
        }
        default:
            return state;
    }
};

export const ResetPassWordReducer = (state = {}, action) => {
    switch (action.type) {
        case types.RESET_PASS_WORD_REQUEST:
            return { loading: true, data: {} };
        case types.RESET_PASS_WORD_SUCCESS: {
            return { loading: false, success: true, data: action.payload };
        }
        case types.RESET_PASS_WORD_FAIL: {
            return { loading: false, error: action.payload };
        }
        case types.RESET_PASS_WORD_RESET: {
            return {};
        }
        default:
            return state;
    }
};
