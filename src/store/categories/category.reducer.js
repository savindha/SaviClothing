import { CATEGORIES_TYPES } from "./category.types";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoryReducer = (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload
            }
        case CATEGORIES_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORIES_TYPES.FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        default:
            return state;
    }

}