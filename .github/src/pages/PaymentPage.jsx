import React, { useState } from "react";

const PaymentPage = () => {
  const [active, setActive] = useState(null);

  const paymentOptions = [
    "Wallets",
    "Add credit or debit cards",
    "Netbanking",
    "Add new UPI ID",
    "Cash",
    "Pay Later",
  ];

  const toggleActive = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h2 className="mb-5 text-2xl">Select Payment Method:</h2>
        <div style={styles.accordion}>
          {paymentOptions.map((option, index) => (
            <div key={index} style={styles.option}>
              <div
                style={styles.header}
                onClick={() => toggleActive(index)}
              >
                {option}
                <span className="text-green-900">{active === index ? "▲" : "▼"}</span>
              </div>
              {active === index && (
                <div style={styles.content}>
                  {/* Example content for each option */}
                  {option === "Add credit or debit cards" ? (
                    <form style={styles.form}>
                      <input type="text" placeholder="Card Number" style={styles.input} />
                      <input type="text" placeholder="Expiry MM/YY" style={styles.input} />
                      <input type="text" placeholder="CVV" style={styles.input} />
                    </form>
                  ) : (
                    <p>Enter details for {option}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <h3 className="font-semibold">Delivery Address;</h3>
          <p> <span className="font-semibold" >Home:</span> Floor xxcx, xxx, cxfdf, DLE Industrial Area, Kirti Nagar, Delhi</p>
        </div>
        <div style={styles.card}>
            <div className="flex space-x-10">
                <h3 className="font-semibold" >My Cart:</h3>
                <p className="font-semibold text-red-600" >1 item</p>
            </div>
          
          <p>Beanly Choco Hazelnut Spread - 52 g - ₹114</p>
        </div>
        <button style={styles.payButton}>Pay Now</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    gap: "50px",
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  accordion: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
  },
  option: {
    borderBottom: "1px solid #ccc",
  },
  header: {
    padding: "15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "500",
  },
  content: {
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fff",
  },
  payButton: {
    padding: "15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default PaymentPage;
