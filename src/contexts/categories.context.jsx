import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js'
import { addCollectionsAndDocuments, getCollectionsAndDocuments } from "../utils/firebase/firebase.util.js";

export const CategoriesContext = createContext({
    categoriesMap: []
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCollectionsAndDocuments()
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap()

        /**
         * Below is to add data to DB. Should run only ONCE.
         * 
         * addCollectionsAndDocuments('categories', SHOP_DATA)
         */

    }, [])


    const value = { categoriesMap }

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>


}