import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../store/categories/category.selectors';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectIsCategoriesLoading)
    const [products, setProducts] = useState(categoriesMap[category])



    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [categoriesMap, category])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ?
                <Spinner /> :
                <div className='category-container'>
                    {
                        products && products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>}
        </Fragment>

    )

}

export default Category;