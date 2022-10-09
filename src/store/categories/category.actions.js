import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_TYPES } from "./category.types";
import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.util";

// export const setCategories = (categoriesArray) => {
//     return createAction(CATEGORIES_TYPES.SET_CATEGORIES, categoriesArray)
// }

export const fetchCategoriesStart = () => {
    return createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START)
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    return createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
}

export const fetchCategoriesError = (error) => {
    return createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_ERROR, error)
}


export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await getCollectionsAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error) {
        dispatch(fetchCategoriesError(error))
    }

}