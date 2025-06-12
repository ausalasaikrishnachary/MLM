// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontFamily: 'Helvetica',
//   },
//   outerBorder: {
//     border: '1px solid #000',
//     padding: 10,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottom: '1px solid #000',
//     paddingBottom: 5,
//   },
//   headerLeft: {
//     flex: 1,
//   },
//   headerRight: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   companyName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   companyAddress: {
//     fontSize: 10,
//     lineHeight: 1.5,
//     marginBottom: 5,
//   },
//   companyContact: {
//     fontSize: 10,
//     lineHeight: 1.5,
//     marginBottom: 5,
//   },
//   invoiceTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   invoiceDetailsRow: {
//     flexDirection: 'row',
//     borderBottom: '1px solid #000',
//     paddingVertical: 8,
//   },
//   invoiceDetailsLeft: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   invoiceDetailsRight: {
//     flex: 1,
//     paddingLeft: 10,
//     justifyContent: 'center',
//   },
//   detailText: {
//     fontSize: 10,
//     marginBottom: 3,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     borderBottom: '1px solid #000',
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 4,
//     marginTop: 10,
//   },
//   sectionTitle: {
//     flex: 1,
//     fontSize: 12,
//     fontWeight: 'bold',
//     paddingLeft: 5,
//   },
//   sectionContentRow: {
//     flexDirection: 'row',
//     minHeight: 50,
//     borderBottom: '1px solid #000',
//   },
//   sectionLeft: {
//     flex: 1,
//     padding: 5,
//   },
//   sectionRight: {
//     flex: 1,
//     padding: 5,
//   },
// });

// const InvoiceDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.outerBorder}>

//         {/* Header Row with Company Info and TAX INVOICE */}
//         <View style={styles.headerRow}>
//           <View style={styles.headerLeft}>
//             <Text style={styles.companyName}>INFAB AGRO FOODS PRIVATE LIMITED</Text>
//             <Text style={styles.companyAddress}>
//               125/3 Kamminke Village Hejala Circle{"\n"}
//               South taluk near featherlite Bangalore{"\n"}
//               Bangalore Karnataka 562109{"\n"}
//               India
//             </Text>
//             <Text style={styles.companyContact}>
//               GSTN 29AAHCH1372F12K{"\n"}
//               9743112460 / 6363900869{"\n"}
//               infabfoods@gmail.com{"\n"}
//               infabfoods.com
//             </Text>
//           </View>
//           <View style={styles.headerRight}>
//             <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
//           </View>
//         </View>

//         {/* Invoice Details Section */}
//         <View style={styles.invoiceDetailsRow}>
//           <View style={styles.invoiceDetailsLeft}>
//             <Text style={styles.detailText}>
//               # <Text style={styles.boldText}>: INV-090</Text>
//             </Text>
//             <Text style={styles.detailText}>
//               Invoice Date <Text style={styles.boldText}>: 24/05/2025</Text>
//             </Text>
//             <Text style={styles.detailText}>
//               Terms <Text style={styles.boldText}>: Due on Receipt</Text>
//             </Text>
//             <Text style={styles.detailText}>
//               Due Date <Text style={styles.boldText}>: 24/05/2025</Text>
//             </Text>
//           </View>
//           <View style={styles.invoiceDetailsRight}>
//             <Text style={styles.detailText}>
//               Place Of Supply <Text style={styles.boldText}>: Karnataka (29)</Text>
//             </Text>
//           </View>
//         </View>

//         {/* Bill To / Ship To Section Header */}
//         <View style={styles.sectionRow}>
//           <Text style={styles.sectionTitle}>Bill To</Text>
//           <Text style={styles.sectionTitle}>Ship To</Text>
//         </View>

//         {/* Bill To / Ship To Content */}
//         <View style={styles.sectionContentRow}>
//           <View style={styles.sectionLeft}>
//             <Text style={[styles.detailText, styles.boldText]}>Deepak Stores</Text>
//             <Text style={styles.detailText}>Gandhi bazar</Text>
//             <Text style={styles.detailText}>Bangalore</Text>
//             <Text style={styles.detailText}>562109 Karnataka</Text>
//             <Text style={styles.detailText}>India</Text>
//           </View>
//           <View style={styles.sectionRight}>
//             <Text style={styles.detailText}>Gandhi bazar</Text>
//           </View>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// export default InvoiceDocument;





import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from './Images/logo.png';
const styles = StyleSheet.create({
        page: {
                padding: 20,
                fontFamily: 'Helvetica',
        },
        outerBorder: {
                border: '1px solid #000',
                padding: 10,
        },
        headerContainer: {
                flexDirection: 'column',
                //marginBottom: 10,
                borderBottom: '1px solid #000',
                paddingBottom: 10,
        },
        companyNameRow: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 5,
        },
        detailsRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
        },
        addressColumn: {
                flex: 1,
        },
        logoColumn: {
                flex: 1,
                alignItems: 'center',
        },
        contactColumn: {
                flex: 1,
                alignItems: 'flex-end',
        },
        logo: {
                width: 150,
                height: 80,
        },
        companyName: {
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 5,
        },
        companyAddress: {
                fontSize: 9,
                lineHeight: 1.3,
                marginBottom: 5,
                textAlign: 'left',
        },
        companyContact: {
                fontSize: 9,
                lineHeight: 1.3,
                marginBottom: 5,
                textAlign: 'right',
        },
        invoiceTitle: {
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'right',
        },
        invoiceDetailsRow: {
                flexDirection: 'row',
                borderBottom: '1px solid #000',
                // paddingVertical: 8,
                position: 'relative',
                minHeight: 60,
        },
        invoiceDetailsLeft: {
                flex: 1,
                paddingRight: 10,
                marginTop:3,
        },
        invoiceDetailsRight: {
                flex: 1,
                paddingLeft: 10,
                                marginTop:3,

        },
        rowItem: {
                flexDirection: 'row',
                fontSize: 9,
                marginBottom: 3,
        },
        label: {
                width: '50%',
        },
        value: {
                fontWeight: 'bold',
        },
        sectionRow: {
                flexDirection: 'row',
                borderBottom: '1px solid #000',
                backgroundColor: '#f0f0f0',
                paddingVertical: 4,
                //     marginTop: 5,
                position: 'relative',
                minHeight: 25,
        },
        sectionTitle: {
                flex: 1,
                fontSize: 12,
                fontWeight: 'bold',
                paddingLeft: 5,
                marginTop: 3,
        },
        sectionContentRow: {
                flexDirection: 'row',
                minHeight: 50,
                borderBottom: '1px solid #000',
                position: 'relative',
        },
        sectionLeft: {
                flex: 1,
                padding: 5,
        },
        sectionRight: {
                flex: 1,
                padding: 5,
        },
        divider: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                borderLeft: '1px solid #000',
        },
        detailText: {
                fontSize: 9,
                marginBottom: 2,
        },
        boldText: {
                fontWeight: 'bold',
        },

        tableHeaderRow: {
                flexDirection: 'row',
                borderBottom: '1px solid #000',
                backgroundColor: '#e0e0e0',
                minHeight: 23,
                alignItems: 'center',
        },
        tableDataRow: {
                flexDirection: 'row',
                borderBottom: '1px solid #000',
                minHeight: 23,
                alignItems: 'center',
        },
        tableCell: {
                fontSize: 9,
                padding: 6,
                borderRight: '1px solid #000',
        },
        colSNo: {
                width: '10%',
        },
        colItem: {
                width: '40.2%',
        },
        colQty: {
                width: '14.8%',
        },
        colRate: {
                width: '15%',
        },
        colTotal: {
                width: '20%',
        },
        summaryRow: {
                flexDirection: 'row',
                marginTop: 10,
        },
        summaryLeft: {
                flex: 7, // 70%
                paddingRight: 10,
        },
        summaryRight: {
                flex: 3, // 30%
                paddingLeft: 10,
        },
        summaryItem: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
        },
        boldSummary: {
                fontWeight: 'bold',
                fontSize: 10,
        },
        summaryText: {
                fontSize: 9,
        },
        // Footer
        footer: { marginTop: 15 },
        footerText: { fontSize: 8, marginBottom: 3, lineHeight: 1.3 },
        footerBold: { fontWeight: 'bold' },

        footerRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
        },
        thankYouText: {
                fontSize: 8,
                lineHeight: 1.3,
                flex: 2, // Takes more space
        },
        signatureContainer: {
                flex: 1, // Takes less space
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                paddingRight: 20,
        },
        signatureText: {
                fontSize: 10,
                marginTop: 30,
                borderTop: '1px solid #000',
                paddingTop: 5,
        },
});

const InvoiceDocument = ({ 
  property,
  receiptNumber = `INV-${Math.floor(100 + Math.random() * 900)}`,
  date = new Date().toLocaleDateString('en-IN'),
  user = {
    name: localStorage.getItem('user_name') || 'N/A',
    email: localStorage.getItem('email') || 'N/A',
    phone: localStorage.getItem('phone_number') || 'N/A',
    referralId: localStorage.getItem('referral_id') || 'N/A',
    referredBy: localStorage.getItem('referred_by') || 'N/A'
  }
}) => {
  // Convert number to words (simplified version)
  const numberToWords = (num) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero';
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
    
    // Simplified for demo - would need more logic for hundreds, thousands, etc.
    return 'Indian Rupee ' + num + ' Only';
  };

  const totalAmount = property.booking_amount || 0;
  const totalInWords = numberToWords(totalAmount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          {/* Header Row */}
          <View style={styles.headerContainer}>
            {/* Company Name - Centered */}
            <View style={styles.companyNameRow}>
              <Text style={styles.companyName}>SHRIRAJ PROPERTY SOLUTIONS PRIVATE LIMITED</Text>
            </View>

            {/* Details Row */}
            <View style={styles.detailsRow}>
              {/* Address - Left */}
              <View style={styles.addressColumn}>
                <Text style={styles.companyAddress}>
                  50/4, SHRIRAJ PROPERTY SOLUTIONS PRIVATE LIMITED{"\n"}
                  Atal Chowk, Main Road Boria Khurd, Near Durga Mandir,{"\n"}
                  Raipur, Chhattisgarh, 492017{"\n"}
                  India
                </Text>
              </View>

              {/* Logo - Middle */}
              <View style={styles.logoColumn}>
                <Image src={logo} style={styles.logo} />
              </View>

              {/* Contact and Invoice Title - Right */}
              <View style={styles.contactColumn}>
                <Text style={styles.companyContact}>
                  GSTN 22ABDCS6806R2ZV{"\n"}
                  9743112460 / 6363900869{"\n"}
                  shriraj@gmail.com{"\n"}
                  shriraj.com
                </Text>
                <Text style={styles.invoiceTitle}>TAX RECEIPT</Text>
              </View>
            </View>
          </View>
          
          {/* Invoice Details Section */}
          <View style={styles.invoiceDetailsRow}>
            <View style={styles.invoiceDetailsLeft}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>#</Text>
                <Text style={styles.value}>: {receiptNumber}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Receipt Date</Text>
                <Text style={styles.value}>: {date}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Terms</Text>
                <Text style={styles.value}>: Due on Receipt</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Due Date</Text>
                <Text style={styles.value}>: {date}</Text>
              </View>
            </View>

            <View style={styles.invoiceDetailsRight}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>: {user.name}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>: {user.email}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>: {user.phone}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Referral ID</Text>
                <Text style={styles.value}>: {user.referralId}</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Referred By</Text>
                <Text style={styles.value}>: {user.referredBy}</Text>
              </View>
            </View>

            {/* Vertical divider */}
            <View style={styles.divider} />
          </View>

          {/* Table Header Row */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableCell, styles.colSNo]}>S NO</Text>
            <Text style={[styles.tableCell, styles.colItem]}>Property Title</Text>
            <Text style={[styles.tableCell, styles.colQty]}>Property Value</Text>
            <Text style={[styles.tableCell, styles.colRate]}>Booking Amount</Text>
            <Text style={[styles.tableCell, styles.colTotal, { borderRight: 'none' }]}>Total</Text>
          </View>

          {/* Table Data Row */}
          <View style={styles.tableDataRow}>
            <Text style={[styles.tableCell, styles.colSNo]}>1</Text>
            <Text style={[styles.tableCell, styles.colItem]}>{property.title}</Text>
            <Text style={[styles.tableCell, styles.colQty]}>{property.value}</Text>
            <Text style={[styles.tableCell, styles.colRate]}>{property.bookingAmount || '0'}</Text>
            <Text style={[styles.tableCell, styles.colTotal, { borderRight: 'none' }]}>{property.bookingAmount || '0'}</Text>
          </View>

          {/* Summary Section */}
          <View style={styles.summaryRow}>
            {/* Left Side: Total in Words */}
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryText}>Total In Words</Text>
              <Text style={styles.boldSummary}>{totalInWords}</Text>
            </View>

            {/* Right Side: Subtotal / Shipping / Grand Total */}
            <View style={styles.summaryRight}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryText}>Sub Total</Text>
                <Text style={styles.summaryText}>{totalAmount}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryText}>Shipping</Text>
                <Text style={styles.summaryText}>0</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.boldSummary}>Grand Total</Text>
                <Text style={styles.boldSummary}>{totalAmount}</Text>
              </View>
            </View>
          </View>
          
          {/* Modified footer row with thank you message and signature */}
          <View style={styles.footerRow}>
            <Text style={styles.thankYouText}>
              Thank you for Trusting Us! Your support inspires us to {"\n"}
              Consistently Deliver Quality and Innovation. We Look {"\n"}
              Forward to Serving You Again.
            </Text>

            <View style={styles.signatureContainer}>
              <Text style={styles.signatureText}>Authorized Signature</Text>
            </View>
          </View>

          <Text style={[styles.footerText, styles.footerBold]}>Payment Options</Text>
          <Text style={styles.footerText}>Bank Name - State Bank of India</Text>
          <Text style={styles.footerText}>Account no - 42807658439</Text>
          <Text style={styles.footerText}>IFSC Code - SBIN0017780</Text>
          <Text style={styles.footerText}>Branch - Channasandra Bangalore</Text>

          <Text style={[styles.footerText, styles.footerBold]}>Terms & Conditions</Text>
          <Text style={styles.footerText}>1. Payment must be made within the due date from the invoice date.</Text>
          <Text style={styles.footerText}>
            2. Accepted payment methods include Bank Transfer, UPI, Demand Draft (DD), and Cheque
          </Text>
          <Text style={styles.footerText}>3. Cash payments are not accepted.</Text>
          <Text style={styles.footerText}>4. Prices are exclusive of applicable taxes.</Text>
          <Text style={styles.footerText}>5. Orders cannot be canceled once they have been processed.</Text>
          <Text style={styles.footerText}>
            6. Refund or exchange of goods will be done only for defective or damaged goods upon inspection by the company.
          </Text>
          <Text style={styles.footerText}>
            7. Responsibility ceases regarding the weight of the goods once the box tape is Tampered.
          </Text>
          <Text style={styles.footerText}>For any queries, please contact</Text>
          <Text style={styles.footerText}>Email- contact@southsutra.com</Text>
          <Text style={styles.footerText}>Contact - 8971607888 / 6363900869</Text>
        </View>
      </Page>
    </Document>
  );
};


export default InvoiceDocument;

