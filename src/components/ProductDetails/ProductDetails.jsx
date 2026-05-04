import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { cartContext } from '../../context/CartContextProvider';
import toast from 'react-hot-toast';
export default function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = React.useState(null);
    const [productImages, setProductImages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const {addToCart,res} = useContext(cartContext);

    function addProductToCart(id) {
        const response = addToCart(id);
        if (response) {
            toast.success("Product added to cart!", {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    padding: '12px 20px',
                    color: '#374151', 
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: '500',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                },
                iconTheme: {
                    primary: '#3B82F6', 
                    secondary: '#FFFFFF',
                },
            });
        } else {
            toast.error("Failed to add product to cart. Please try again.");
        }
    }

    async function getProductDetails() {
        setIsLoading(true);
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((response) => {
                setProductDetails(response.data.data);
                setProductImages(response.data.data.images || []);
            }).catch((error) => {
                console.error("Error fetching product details:", error);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        if (id) getProductDetails();
    }, [id]);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : prev));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mx-auto">

                <div className="relative md:col-span-1 bg-white-50/50 flex items-center justify-center group min-h-[400px]">
                    <img
                        className="object-contain w-full h-full p-8 mix-blend-multiply"
                        src={productImages[currentIndex] || productDetails?.imageCover}
                        alt={productDetails?.title}
                    />

                    {productImages.length > 1 && (
                        <>
                            <button
                                disabled={currentIndex <= 0}
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:invisible"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <button
                                disabled={currentIndex >= productImages.length - 1}
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:invisible"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-sm text-gray-600 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-gray-100">
                        {currentIndex + 1} / {productImages.length || 1}
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col p-8 md:p-12 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <Link to={`/category/${productDetails?.category._id}`}>
                            <span className="text-[11px] underline text-blue-600 uppercase tracking-wider">
                                {productDetails?.category?.name}
                            </span>
                        </Link>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 text-xs font-medium italic">
                            {productDetails?.brand.name}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {productDetails?.title}
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
                        {productDetails?.description}
                    </p>

                    <div className="mt-auto pt-8 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                        <div className="flex flex-col">
                            <span className="text-sm text-gray-400 font-medium mb-1">Total Price</span>
                            <div className="flex items-baseline gap-3">
                                {productDetails?.priceAfterDiscount ? (
                                    <>
                                        <span className="text-3xl font-black text-blue-600">
                                            {productDetails?.priceAfterDiscount} <small className="text-sm">EGP</small>
                                        </span>
                                        <span className="text-l text-red-400 line-through decoration-red-400/50">
                                            {productDetails?.price} EGP
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-black text-gray-900">
                                        {productDetails?.price} <small className="text-sm">EGP</small>
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => addProductToCart(productDetails.id)}
                            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}