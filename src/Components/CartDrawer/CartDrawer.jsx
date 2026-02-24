import React, { useEffect, useState } from 'react';
import { Drawer, IconButton, Divider } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import './CartDrawer.css';
import { useSelector } from 'react-redux';
import { getGuestCart, setGuestCart } from '../../utils/guestCart';

function CartDrawer({ open, onClose, data = [] }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [localData, setLocalData] = useState([]);

  const handlePlaceOrder = () => {
    if (!user) {
      // Guest: redirect to login
      navigate('/Login');
      onClose();
    } else {
      // Logged in: go to cart page for checkout
      navigate('/cartPage');
      onClose();
    }
  };

  // Normalize guest items to the server item shape used in UI
  const normalizeGuest = (g) => {
    return g.map((it) => ({
      // for consistency prefer productId wrapper when available
      _id: it._id || it.productId?._id,
      productId: {
        _id: it._id || it.productId?._id,
        images: it.images || it.productId?.images || [],
        name: it.name || it.productId?.name,
        originalPrice: it.originalPrice || it.productId?.originalPrice,
      },
      price: it.currentPrice || it.price || (it.productId?.currentPrice ?? 0),
      quantity: it.quantity || 1,
    }));
  };

  // Compute source data: prefer prop `data` when user is logged in and it has items,
  // otherwise read from guest localStorage
  useEffect(() => {
    if (user) {
      setLocalData(data || []);
    } else {
      const guest = getGuestCart() || [];
      setLocalData(normalizeGuest(guest));
    }
  }, [data, user, open]);

  // Subtotal (price × quantity)
  const subTotal = localData.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  // Original total (originalPrice × quantity)
  const originalTotal = localData.reduce(
    (total, item) => total + (item.productId?.originalPrice || item.price || 0) * (item.quantity || 0),
    0,
  );

  const discountAmount = originalTotal - subTotal;
  const totalPrice = subTotal;

  // Guest handlers (mutate localStorage and update local state)
  const removeGuestItem = (prodId) => {
    const guest = getGuestCart() || [];
    const updated = guest.filter((i) => i._id !== prodId && i.productId?._id !== prodId);
    setGuestCart(updated);
    setLocalData(normalizeGuest(updated));
  };

  const changeGuestQty = (prodId, delta) => {
    const guest = getGuestCart() || [];
    const idx = guest.findIndex((i) => i._id === prodId || i.productId?._id === prodId);
    if (idx === -1) return;
    const item = guest[idx];
    const newQty = (item.quantity || 1) + delta;
    if (newQty <= 0) {
      guest.splice(idx, 1);
    } else {
      guest[idx] = { ...item, quantity: newQty };
    }
    setGuestCart(guest);
    setLocalData(normalizeGuest(guest));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
          },
          boxShadow: '-4px 0px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <div className="cart-drawer-wrapper">
        {/* ================= HEADER ================= */}
        <div className="drawer-header">
          <div className="header-content">
            <h2 className="header-title">Shopping Cart</h2>
            <span className="item-count">{data.length} items</span>
          </div>

          <IconButton
            onClick={onClose}
            sx={{
              color: '#6b7280',
              '&:hover': { backgroundColor: '#f3f4f6' },
            }}
          >
            <IoMdClose size={24} />
          </IconButton>
        </div>

        <Divider sx={{ margin: 0 }} />

        {/* ================= CONTENT ================= */}
        <div className="drawer-content">
          {localData.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add products to get started!</p>
              <button onClick={onClose} className="btn btn-empty-continue">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* ================= PRODUCTS LIST ================= */}
              <div className="products-list h-24">
                {localData.map((item) => {
                  const prodId = item.productId?._id || item._id;
                  return (
                    <div key={prodId} className="cart-item">
                      <div className="item-image-wrapper">
                        <img
                          src={item.productId?.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${item.productId.images[0]}` : ''}
                          alt={item.productId?.name}
                          className="item-image"
                        />
                        <span className="item-qty-badge">{item.quantity}</span>
                      </div>

                      <div className="item-info">
                        <h4 className="item-name">{item.productId?.name}</h4>

                        <p className="item-description">
                          {item.variants?.length > 0 && (
                            <span className="variant-badge bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold mr-2 uppercase">
                              {item.variants?.[0]?.unit}
                            </span>
                          )}
                          Qty: <span>{item.quantity}</span>
                        </p>

                        <div className="item-pricing">
                          <span className="current-price">₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>

                          {item.productId?.originalPrice && (
                            <span className="original-price">₹{(item.productId.originalPrice * (item.quantity || 0)).toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      {user ? (
                        <button className="btn-remove" title="Remove item">
                          <MdDeleteOutline size={18} />
                        </button>
                      ) : (
                        <div className="guest-controls">
                          <button className="btn-qty" onClick={() => changeGuestQty(prodId, -1)}>
                            -
                          </button>
                          <button className="btn-remove" onClick={() => removeGuestItem(prodId)} title="Remove item">
                            <MdDeleteOutline size={18} />
                          </button>
                          <button className="btn-qty" onClick={() => changeGuestQty(prodId, 1)}>
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ================= SUMMARY ================= */}
              <div className="summary-section">
                <Divider sx={{ margin: '16px 0' }} />

                {/* <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span className="label">Subtotal</span>
                    <span className="value">
                      ₹{subTotal.toFixed(2)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="breakdown-row discount">
                      <span className="label">Discount</span>
                      <span className="value discount-value">
                        - ₹{discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="breakdown-row">
                    <span className="label">Delivery</span>
                    <span className="value free">FREE</span>
                  </div>
                </div> */}

                <Divider sx={{ margin: '12px 0' }} />

                <div className="price-total">
                  <span className="label">Total Amount</span>
                  <span className="total-price">₹{totalPrice.toFixed(2)}</span>
                </div>

                <p className="delivery-info">✓ Free delivery on this order</p>
              </div>
            </>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        {localData.length > 0 && (
          <div className="drawer-footer">
            <Link to="/cartPage" onClick={onClose} className="link-btn">
              <button className="btn btn-secondary">View Full Cart</button>
            </Link>

            <button onClick={handlePlaceOrder} className="link-btn">
              <button className="btn btn-primary">{user ? 'Checkout' : 'Login to Order'}</button>
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
