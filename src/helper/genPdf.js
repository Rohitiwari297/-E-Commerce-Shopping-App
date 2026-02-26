//invoice download
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/hel.png'; //  use store logo here

export const handleInvoice = (order) => {
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

    //  Add Logo + Store Info
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

    // Line under header
    doc.setDrawColor(0);
    doc.line(15, 35, 195, 35);

    // Customer Info Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Billed To:", 15, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Rohit Tripathi", 15, 52);
    doc.text("+91 9560613581", 15, 58);
    doc.text("Delhi, India", 15, 64);

    //  Order Info Section
    doc.setFont("helvetica", "bold");
    doc.text("Order Details:", 120, 45);
    doc.doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Order ID: ${order.id}`, 120, 52);
    doc.text(`Date: ${order.date}`, 120, 58);
    doc.text(`Status: ${order.status}`, 120, 64);
    if (order.deliveredOn)
        doc.text(`Delivered On: ${order.deliveredOn}`, 120, 70);

    //  Product Table
    autoTable(doc, {
        startY: 80,
        head: [["#", "Product", "Qty", "Price (Rs.)", "Total (Rs)"]],
        body: [[1, order.productName, 1, order.price, order.price]],
        theme: "grid",
        headStyles: { fillColor: [0, 102, 0], textColor: 255, fontStyle: "bold" },
        bodyStyles: { textColor: [40, 40, 40] },
        styles: { halign: "center" },
        columnStyles: {
            1: { halign: "left" },
        },
    });

    //  Total Section
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", 150, finalY);
    doc.text(`Rs.${order.price}`, 200, finalY, { align: "right" });
    doc.text("Delivery Fee:", 150, finalY + 7);
    doc.text("Rs.0", 200, finalY + 7, { align: "right" });
    doc.text("Total Amount:", 150, finalY + 14);
    doc.text(`Rs.${order.price}`, 200, finalY + 14, { align: "right" });

    // Line above footer
    doc.line(15, finalY + 25, 195, finalY + 25);

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Thank you for shopping with Baniya Di Hatti!", 15, finalY + 35);
    doc.text(
        "For assistance, contact support@baniyadihatti.com",
        15,
        finalY + 41,
    );
    doc.text("Authorized Signature", 150, finalY + 41);
    doc.line(150, finalY + 42, 190, finalY + 42);

    //  Save PDF
    doc.save(`Invoice_${order.id}.pdf`);
};