import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ( {title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className='preview'>
        {products.filter((_, idx)=> idx<4)
        .map((product) => {
          return(<ProductCard key={product.id} title={title} product={product}/>)
        })}
      </div>

    </div>
  )
}

export default CategoryPreview;