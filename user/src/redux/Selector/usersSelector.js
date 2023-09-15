import { createSelector } from 'reselect';

export const userDetails = (state) => state.userDetails;
export const userLogin = (state) => state.userLogin;
export const userRegister = (state) => state.userRegister;
export const userUpdateProfile = (state) => state.userUpdateProfile;
export const provincesVietNam = (state) => state.provincesVietNam;
export const avatarLoad = (state) => state.avatarLoad;
export const forgotPassWordState = (state) => state.forgotPassWordState;
export const resetPasswordState = (state) => state.resetPasswordState;

export const usersRemainingSelector = createSelector(
    userDetails,
    userLogin,
    userRegister,
    userUpdateProfile,
    provincesVietNam,
    avatarLoad,
    forgotPassWordState,
    resetPasswordState,
    (
        userDetails,
        userLogin,
        userRegister,
        userUpdateProfile,
        provincesVietNam,
        avatarLoad,
        forgotPassWordState,
        resetPasswordState,
    ) => {
        return {
            userDetails,
            userLogin,
            userRegister,
            userUpdateProfile,
            provincesVietNam,
            avatarLoad,
            forgotPassWordState,
            resetPasswordState,
        };
    },
);
