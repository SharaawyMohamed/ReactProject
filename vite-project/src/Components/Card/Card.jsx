
export default function Card(product) {

    return (
        <div className="container">
            <div className='h-screen flex items-center justify-center'>
                <p>Name: {product.name}</p>  
                <p>Price: ${product.price}</p>
                <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
                <button className="btn btn-primary">Buy Now</button>
                <button className="btn btn-secondary">Add to Cart</button>
            </div>
        </div>
    )
}