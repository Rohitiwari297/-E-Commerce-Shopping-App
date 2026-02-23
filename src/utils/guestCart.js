export const getGuestCart = () => {
    return JSON.parse(localStorage.getItem("guestCart")) || [];
};

export const setGuestCart = (cart) => {
    localStorage.setItem("guestCart", JSON.stringify(cart));
    // Dispatch custom event to notify components of cart change
    window.dispatchEvent(new Event('guestCartUpdated'));
};