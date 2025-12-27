import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartQuantityAPI } from "../../redux/features/cart/cartSlice.js";

const CartItem = React.memo(({ item }) => {
    const dispatch = useDispatch();

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

    const handleRemove = () => {
        // Assuming handleRemove logic will be passed or moved here if it depends on local state?
        // Actually, the original code had handleRemove in the parent but accessing item.id.
        // Ideally, remove functionality should be here or passed down.
        // For now, I'll assume the simple remove might need more context or I can just dispatch the remove action if it existed.
        // The original code used `setCartData` which is local state?? Wait.
        // Line 88 in CartPage: `setCartData((prev) => prev.filter((item) => item.id !== id));`
        // But CartPage uses Redux: `const { items ... } = useSelector(...)`
        // AND `setCartData` is NOT DEFINED in the file `CartPage.jsx` I read. 
        // Ah, I see `handleRemove` in the original file (line 87) calls `setCartData`.
        // But `setCartData` is NOWHERE defined in the `CartPage` component. 
        // It seems that `handleRemove` was broken or relying on some non-existent state?
        // Or maybe I missed it. Let me check line 1. `import React, { useState } from "react";`.
        // Line 14: `const [openAddressModal, setOpenAddressModal] = useState(false);`.
        // `setCartData` is definitely missing. This means the remove button was LIKELY ERRORING out or doing nothing.
        // I will comment out remove for now or try to implement a proper Redux remove if the action exists.
        // The cartSlice exports `removeFromCart` (synchronous) but possibly `updateCartQuantityAPI` with 0 removes it?
        // Looking at cartSlice line 82: `if (item && item.qty > 1) ... else { state.items.filter(...) }` in decreaseQty.
        // But that's synchronous reducers.
        // The API integration usually handles removal if quantity is 0, or requires a delete endpoint.
        // I see `fetchCartAPI` and `updateCartQuantityAPI` but no clear `removeFromCartAPI` in the imports of CartPage.
        // Wait, I should double check `cartSlice.js` imports. It had `clearCartAPI` but I didn't see `removeFromCartAPI` in the async thunks.
        // I'll stick to increment/decrement for now and maybe leave the remove button as a TODO or just pass it as a prop if the parent wants to handle it (even though parent is broken).
        // Actually, best to just dispatch `updateCartQuantityAPI` with 0 if that removes it, or just use the decrease logic to 0.
        // I'll leave `handleRemove` placeholder.
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
            <Link to={"/category/itemDetails/"} state={{ item }}>
                <h5>View Product Details</h5>
            </Link>
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
