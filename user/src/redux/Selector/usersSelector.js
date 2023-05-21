import { createSelector } from 'reselect';

export const userDetails = (state) => state.userDetails;
export const userLogin = (state) => state.userLogin;
export const userRegister = (state) => state.userRegister;
export const userUpdateProfile = (state) => state.userUpdateProfile;
export const userAll = (state) => state.userAll;
export const province = (state) => state.province;
export const avatarLoad = (state) => state.avatarLoad;
export const forgotPassWordState = (state) => state.forgotPassWordState;
export const verifyState = (state) => state.verifyState;
export const resetPasswordState = (state) => state.resetPasswordState;

export const usersRemainingSelector = createSelector(
    userDetails,
    userLogin,
    userRegister,
    userUpdateProfile,
    userAll,
    province,
    avatarLoad,
    forgotPassWordState,
    verifyState,
    resetPasswordState,
    (
        userDetails,
        userLogin,
        userRegister,
        userUpdateProfile,
        userAll,
        province,
        avatarLoad,
        forgotPassWordState,
        verifyState,
        resetPasswordState,
    ) => {
        return {
            userDetails,
            userLogin,
            userRegister,
            userUpdateProfile,
            userAll,
            province,
            avatarLoad,
            forgotPassWordState,
            verifyState,
            resetPasswordState,
        };
    },
);
