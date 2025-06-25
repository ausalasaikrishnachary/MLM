// PostPaymentHandler.js
import React, { useEffect } from 'react';
import { baseurl } from '../../../BaseURL/BaseURL';
import Swal from 'sweetalert2';
import axios from 'axios';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ReceiptDocument from '../../../InvoiceDocument';

function PostPaymentHandler() {
    const agentCommission = localStorage.getItem("agent_commission");

    const generateReceipt = async (invoiceNumber, formData) => {
        try {
            const invoiceData = {
                property: {
                    title: formData.property_name,
                    value: formData.property_value,
                    remainingAmount: formData.remaining_amount || '0',
                    bookingAmount: formData.paid_amount || '0',
                    total: (
                        (parseFloat(formData.remaining_amount || 0) +
                            parseFloat(formData.paid_amount || 0)).toString()
                    ),
                },
                invoice_number: invoiceNumber
            };

            const pdfBlob = await pdf(<ReceiptDocument {...invoiceData} />).toBlob();
            saveAs(pdfBlob, `Invoice_${formData.property_name}.pdf`);
            return pdfBlob;
        } catch (error) {
            console.error("Receipt generation failed:", error);
            return null;
        }
    };

    useEffect(() => {
       const confirmAndProceed = async () => {
    try {
        const merchant_order_id = localStorage.getItem("merchant_order_id");
        const user_id = localStorage.getItem("user_id");
        const property_id = localStorage.getItem("property_id");

        // Step 1: Confirm payment
        const confirmRes = await fetch(`${baseurl}/property/confirm-payment/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id,
                property_id,
                payment_type: "Full-Amount",
                merchant_order_id,
                document_file: null
            }),
        });

        const confirmData = await confirmRes.json();
        console.log("✅ Payment confirmed:", confirmData);

        // Step 2: Create the transaction (new step)
        const transactionPayload = {
            user_id,
            property_id,
            paid_amount: confirmData.paid_amount || 0,
            remaining_amount: 0,
            payment_type: "Full-Amount",
            company_commission: confirmData.company_commission || 0,
            role: "agent",
            transaction_for: "property",
            document_file: null
        };

        const txCreateRes = await fetch(`${baseurl}/transactions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transactionPayload),
        });

        if (!txCreateRes.ok) {
            const err = await txCreateRes.json();
            throw new Error(`❌ Transaction Create Error: ${JSON.stringify(err)}`);
        }

        const createdTransaction = await txCreateRes.json();
        console.log("✅ Transaction Created:", createdTransaction);

        // Step 3: Update property status
        await fetch(`${baseurl}/property/${property_id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agent_commission_balance: agentCommission }),
        });

        // Step 4: Generate and upload PDF
        const invoiceNumber = createdTransaction?.document_number || 'N/A';
        const fullPaymentTransactionId = createdTransaction?.transaction_id || 'N/A';

        const pdfBlob = await generateReceipt(invoiceNumber, createdTransaction);
        if (!pdfBlob) return;

        const uploadFormData = new FormData();
        const fileName = `${invoiceNumber}.pdf`;
        uploadFormData.append('document_file', new File([pdfBlob], fileName, { type: 'application/pdf' }));

        await axios.put(`${baseurl}/transactions/${fullPaymentTransactionId}/`, uploadFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Transaction submitted and property marked as sold!',
            timer: 2500,
            showConfirmButton: false
        });

    } catch (err) {
        console.error("Post-payment error:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || "Something went wrong after payment."
        });
    }
};


        confirmAndProceed();
    }, []);

    return <h3 style={{ textAlign: 'center' }}>Processing your transaction, please wait...</h3>;
}

export default PostPaymentHandler;
