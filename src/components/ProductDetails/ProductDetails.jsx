import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    async function getProductDetails() {
        setIsLoading(true);
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((response) => {
                setProductDetails(response.data.data);
            }).catch((error) => {
                console.log("Error fetching details:", error);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        if (id) getProductDetails();
    }, [id]);

    return (
        <div className="container mx-auto pt-24 pb-12 px-4">
            <div className="flex flex-col items-center bg-white p-6 border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-4xl mx-auto">
                <img
                    className="object-contain w-full rounded-lg h-64 md:h-auto md:w-80"
                    src={productDetails?.imageCover}
                    alt={productDetails?.title}
                />
                <div className="flex flex-col justify-between md:p-6 leading-normal">
                    {/* FIXED: Using dynamic data instead of hardcoded text */}
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {productDetails?.title}
                    </h5>
                    <p className="mb-6 text-gray-600">
                        {productDetails?.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-emerald-600">{productDetails?.price} EGP</span>
                        <button type="button" className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs px-4 py-2 transition-colors focus:outline-none">
                            <svg className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}