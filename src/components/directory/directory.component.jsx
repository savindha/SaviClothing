import './directory.style.scss'
import CategoryItem from '../category-item/category-item.component'

const Directory = ({ categories }) => {
    return (
        <div className="direcotry-container">
            {categories.map((category) => {
                return (
                    <CategoryItem key={category.id} category={category} />
                )
            })}
        </div>
    )
}

export default Directory;