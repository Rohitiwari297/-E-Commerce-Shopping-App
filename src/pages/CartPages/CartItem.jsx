import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCartAPI, fetchCartAPI, updateCartQuantityAPI } from "../../redux/features/cart/cartSlice.js";

const CartItem = React.memo(({ item }) => {
    const dispatch = useDispatch();

    console.log("CartItem RENDER:", item);


    /**
     * 
     * INCREASING QUANTITY 
     * ==========================
     * 
     */
    const handleIncreaseQuantity = async () => {
        // Check if productId is an object (populated) or string
        const productId = item?.productId?._id || item?.productId || item?.id;

        await dispatch(
            updateCartQuantityAPI({
                productId,
                quantity: (item.quantity || 1) + 1,
            })
        );
        // Removed redundant fetchCartAPI()
    };

     /**
     * 
     * DECREASING QUANTITY 
     * ==========================
     * 
     */
    const handleDecreaseQuantity = async () => {
        const productId = item?.productId?._id || item?.productId || item?.id;

        await dispatch(
            updateCartQuantityAPI({
                productId,
                quantity: String((item.quantity || 1) - 1),
            })
        );
        // Removed redundant fetchCartAPI()
    };

    /**
     * 
     * REMOVING ITEMS FROM CART 
     * ==========================
     * 
     */
    const handleRemove = async() => {
        const productId = item?.productId?._id || item?.productId || item?.id;
        await dispatch(
            clearCartAPI(productId)
        )
        await dispatch(fetchCartAPI());
    };

    const productId = item?.productId?._id || item?.productId;

    return (
        <div className="flex gap-4 p-4 border rounded-md bg-white">
            <img
                src={`${import.meta.env.VITE_BASE_URL}${item?.productId?.images?.[0] || ""}`}
                alt={item.name}
                className="w-24 h-24 object-contain"
            />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="font-semibold">{item?.productId?.name}</h2>
                    <p className="text-sm text-gray-500">Size: {item?.productId?.size}</p>
                    <p className="text-sm text-gray-500">
                        Seller: {item?.productId?.seller}
                    </p>
                    <p className="flex gap-5 text-green-600 font-bold">
                        ₹{item.price ?? 330}{" "}
                        <span className="line-through text-gray-400 text-sm">
                            ₹{item?.productId?.originalPrice}
                        </span>{" "}
                    </p>
                    <p className="text-sm text-gray-500">
                        Delivery by {item.delivery ?? "Thu Oct 9"}
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded">
                        <button className="px-2" onClick={handleDecreaseQuantity}>
                            -
                        </button>
                        <span className="px-2">{item.quantity ?? 1}</span>
                        <button className="px-2" onClick={handleIncreaseQuantity}>
                            +
                        </button>
                    </div>
                    <button
                        className="text-blue-600 hover:underline text-sm"
                        onClick={handleRemove}
                    >
                        REMOVE
                    </button>
                    <button className="text-blue-600 hover:underline text-sm">
                        SAVE FOR LATER
                    </button>
                </div>
            </div>
            {/* <Link to={"/category/itemDetails/"} state={{ List: item}}>
                <button>View Product Details</button>
            </Link> */}
            <button className="text-blue-600 hover:underline -mt-32" onClick={()=> {alert('working on it')}} >Go Back</button>
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparator for strict optimization
    // Only re-render if the Quantity changes or the Product ID changes.
    const prevId = prevProps.item?.productId?._id || prevProps.item?.productId;
    const nextId = nextProps.item?.productId?._id || nextProps.item?.productId;

    // Also check quantity
    const prevQty = prevProps.item?.quantity;
    const nextQty = nextProps.item?.quantity;

    return prevId === nextId && prevQty === nextQty;
});

export default CartItem;
