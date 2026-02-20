import React from "react";
import { Drawer, IconButton, Divider } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./CartDrawer.css";

function CartDrawer({ open, onClose, data = [] }) {
  /* =========================
     CALCULATIONS
  ========================== */

  // Subtotal (price × quantity)
  const subTotal = data.reduce(
    (total, item) =>
      total + (item.price || 0) * (item.quantity || 0),
    0
  );

  // Original total (originalPrice × quantity)
  const originalTotal = data.reduce(
    (total, item) =>
      total +
      (item.productId?.originalPrice || item.price || 0) *
        (item.quantity || 0),
    0
  );

  const discountAmount = originalTotal - subTotal;
  const totalPrice = subTotal;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          "@media (max-width: 600px)": {
            maxWidth: "100%",
          },
          boxShadow: "-4px 0px 12px rgba(0, 0, 0, 0.15)",
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
              color: "#6b7280",
              "&:hover": { backgroundColor: "#f3f4f6" },
            }}
          >
            <IoMdClose size={24} />
          </IconButton>
        </div>

        <Divider sx={{ margin: 0 }} />

        {/* ================= CONTENT ================= */}
        <div className="drawer-content">
          {data.length === 0 ? (
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
                {data.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-image-wrapper">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${item.productId?.images?.[0]}`}
                        alt={item.productId?.name}
                        className="item-image"
                      />
                      <span className="item-qty-badge">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="item-info">
                      <h4 className="item-name">
                        {item.productId?.name}
                      </h4>

                      <p className="item-description">
                        Qty: <span>{item.quantity}</span>
                      </p>

                      <div className="item-pricing">
                        <span className="current-price">
                          ₹
                          {(
                            (item.price || 0) *
                            (item.quantity || 0)
                          ).toFixed(2)}
                        </span>

                        {item.productId?.originalPrice && (
                          <span className="original-price">
                            ₹
                            {(
                              item.productId.originalPrice *
                              (item.quantity || 0)
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="btn-remove"
                      title="Remove item"
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* ================= SUMMARY ================= */}
              <div className="summary-section">
                <Divider sx={{ margin: "16px 0" }} />

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

                <Divider sx={{ margin: "12px 0" }} />

                <div className="price-total">
                  <span className="label">Total Amount</span>
                  <span className="total-price">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <p className="delivery-info">
                  ✓ Free delivery on this order
                </p>
              </div>
            </>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        {data.length > 0 && (
          <div className="drawer-footer">
            <Link
              to="/cartPage"
              onClick={onClose}
              className="link-btn"
            >
              <button className="btn btn-secondary">
                View Full Cart
              </button>
            </Link>

            <Link
              to="/cartPage"
              onClick={onClose}
              className="link-btn"
            >
              <button className="btn btn-primary">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;