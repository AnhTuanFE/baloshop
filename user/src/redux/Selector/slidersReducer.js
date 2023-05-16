import { createSelector } from 'reselect';

export const sliderLoad = (state) => state.sliderLoad;

export const slidersRemainingSelector = createSelector(sliderLoad, (sliderLoad) => {
    return {
        sliderLoad,
    };
});
