import { createSelector } from "reselect";


const selectCateoriesReducer = (state) => state.categories;

export const selectCateories = createSelector(
    [selectCateoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)


export const selectCategoriesMap = createSelector(
    [selectCateories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
)

export const selectIsCategoriesLoading = createSelector(
    [selectCateoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading

)

// export const selectIsCategoriesLoading = (state) => state.categories.isLoading



// export const selectCategoriesMap = (state) => state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
// }, {})



