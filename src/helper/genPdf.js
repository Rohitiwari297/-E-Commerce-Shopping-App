// invoice download
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/hel.png";

export const handleInvoice = (order) => {
    if (!order) return;

    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

    /* ================= HEADER ================= */

    const imgWidth = 25;
    const imgHeight = 25;
    doc.addImage(logo, "PNG", 15, 10, imgWidth, imgHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Baniya Di Hatti", 45, 18);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Near Hanuman Mandir, Delhi - 110085", 45, 25);
    doc.text("Phone: +91 9560613581 | support@baniyadihatti.com", 45, 31);

    doc.line(15, 35, 195, 35);

    /* ================= CUSTOMER INFO ================= */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Billed To:", 15, 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // ⚠️ Agar tumhare paas real user data ho to yaha replace kar dena
    doc.text("Customer Name", 15, 52);
    doc.text("Customer Phone", 15, 58);
    doc.text("Customer Address", 15, 64);

    /* ================= ORDER DETAILS ================= */

    doc.setFont("helvetica", "bold");
    doc.text("Order Details:", 120, 45);

    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${order.orderId}`, 120, 52);
    doc.text(
        `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
        120,
        58
    );
    doc.text(`Status: ${order.status}`, 120, 64);
    doc.text(`Payment: ${order.paymentMethod}`, 120, 70);

    /* ================= PRODUCT TABLE ================= */

    const tableData = order.items.map((item, index) => [
        index + 1,
        item.product?.name || "Product",
        `${item.quantity} ${item.unit || ""}`,
        item.price,
        item.quantity * item.price,
    ]);

    autoTable(doc, {
        startY: 80,
        head: [["#", "Product", "Qty", "Price (Rs.)", "Total (Rs.)"]],
        body: tableData,
        theme: "grid",
        headStyles: {
            fillColor: [0, 102, 0],
            textColor: 255,
            fontStyle: "bold",
        },
        bodyStyles: { textColor: [40, 40, 40] },
        styles: { halign: "center" },
        columnStyles: {
            1: { halign: "left" },
        },
    });

    /* ================= TOTAL SECTION ================= */

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text("Subtotal:", 140, finalY);
    doc.text(`Rs. ${order.totalPrice}`, 200, finalY, { align: "right" });

    doc.text("Delivery Fee:", 140, finalY + 7);
    doc.text("Rs. 0", 200, finalY + 7, { align: "right" });

    doc.text("Total Amount:", 140, finalY + 14);
    doc.text(`Rs. ${order.totalPrice}`, 200, finalY + 14, {
        align: "right",
    });

    doc.line(15, finalY + 25, 195, finalY + 25);

    /* ================= FOOTER ================= */

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text("Thank you for shopping with Baniya Di Hatti!", 15, finalY + 35);
    doc.text(
        "For assistance, contact support@baniyadihatti.com",
        15,
        finalY + 41
    );

    doc.text("Authorized Signature", 150, finalY + 41);
    doc.line(150, finalY + 42, 190, finalY + 42);

    /* ================= SAVE ================= */

    doc.save(`Invoice_${order.orderId}.pdf`);
};