import './categories-preview.styles.scss';
import { Fragment, useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { useNavigate } from 'react-router-dom';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)

    const navigate = useNavigate()

    const navigateToCategoryPages = (title) => {
        navigate(`/${title}`)
    }

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;