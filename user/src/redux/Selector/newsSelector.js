import { createSelector } from 'reselect';

export const getDetailNews = (state) => state.getDetailNews;
export const listNews = (state) => state.listNews;

export const newsRemainingSelector = createSelector(getDetailNews, listNews, (getDetailNews, listNews) => {
    return {
        getDetailNews,
        listNews,
    };
});
