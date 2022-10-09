import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import Spinner from '../../components/spinner/spinner.component'
import { useSelector } from "react-redux";
import { selectIsCategoriesLoading } from "../../store/categories/category.selectors";

const Shop = () => {

    const isLoading = useSelector(selectIsCategoriesLoading)
    return (
        <div>
            {isLoading ?
                <Spinner /> :
                <Routes>
                    <Route index element={<CategoriesPreview />} />
                    <Route path=":category" element={<Category />} />
                </Routes>

            }

        </div>
    )
}

export default Shop;