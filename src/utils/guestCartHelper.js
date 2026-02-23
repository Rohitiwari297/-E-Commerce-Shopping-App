import { getGuestCart, setGuestCart } from './guestCart';
import axios from 'axios';

/**
 * Merge guest cart items into user cart after login
 * This function adds all guest cart products to the user's actual cart
 */
export const mergeGuestCartToUserCart = async () => {
    try {
        const guestCart = getGuestCart();

        if (!guestCart || guestCart.length === 0) {
            console.log('No guest cart items to merge');
            return true;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token available');
            return false;
        }

        // Add each guest cart item to user's cart
        for (const item of guestCart) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}api/cart/add`,
                    {
                        productId: item._id,
                        quantity: item.quantity || 1
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error(`Failed to add item ${item._id} to cart:`, error);
                // Continue with next item even if one fails
            }
        }

        // Clear guest cart from localStorage after successful merge
        setGuestCart([]);
        console.log('Guest cart merged successfully');
        return true;

    } catch (error) {
        console.error('Error merging guest cart:', error);
        return false;
    }
};

/**
 * Clear guest cart from localStorage
 */
export const clearGuestCart = () => {
    setGuestCart([]);
};
