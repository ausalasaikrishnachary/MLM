import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box
} from "@mui/material";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";
import { baseurl } from "../../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";

const Tmoniter = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("agent");
  const [allTransactions, setAllTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${baseurl}/transactions/payment-type/Full-Amount/`
        );

        const transactionsWithStatus = await Promise.all(
          res.data.map(async (transaction) => {
            try {
              const propertyRes = await axios.get(
                `${baseurl}/property/${transaction.property_id}/`
              );
              const status = propertyRes.data.company_commission_status || "N/A";
              return {
                ...transaction,
                company_commission_status: status,
              };
            } catch (error) {
              console.error("Error fetching property status:", error);
              return {
                ...transaction,
                company_commission_status: "Error",
              };
            }
          })
        );

        setAllTransactions(transactionsWithStatus);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const filtered = allTransactions.filter(
      (tx) => tx.role?.toLowerCase() === selectedRole.toLowerCase()
    );
    setTransactions(filtered);
    setPage(1); // Reset to first page on filter change
  }, [selectedRole, allTransactions]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handlePayCommission = async (transaction) => {
    const url = `${baseurl}/commission/distribute/${transaction.transaction_id}/`;
    try {
      console.log("Initiating commission payment for:", transaction.transaction_id);
      const response = await axios.post(url);
      console.log("Commission distributed:", response.data);
      Swal.fire({
        icon: "success",
        title: "Commission Distributed",
        text: `Commission distributed for Transaction ID ${transaction.transaction_id}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to distribute commission:", error);
      Swal.fire({
        icon: "error",
        title: "Distribution Failed",
        text: `Error distributing commission for Transaction ID ${transaction.transaction_id}`,
      });
    }
  };

  const cellStyle = {
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #000",
    backgroundColor: "#f0f0f0",
  };

  const cellBodyStyle = {
    textAlign: "center",
    border: "1px solid #000",
  };

  const noDataStyle = {
    textAlign: "center",
    border: "1px solid #000",
    padding: 2,
  };

  return (
    <>
      <Header />
      <Container sx={{ pt: 3 }}>
<Typography
  variant="h4"
  gutterBottom
  sx={{
    fontSize: {
      xs: "2.0rem",  
      sm: "2.1rem",   
      md: "2.2rem",     
    },
    fontWeight: "bold",  
    textAlign: "center",    
    whiteSpace: "nowrap",   
    overflow: "hidden",
    textOverflow: "ellipsis", 
    marginBottom:'15px',
  }}
>
   Transaction List
</Typography>


        <FormControl sx={{ minWidth: 200, mb: 3 }}>
          <InputLabel id="role-filter-label">Filter by Role</InputLabel>
          <Select
            labelId="role-filter-label"
            value={selectedRole}
            label="Filter by Role"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value="agent">Team</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        </FormControl>


<Box
  sx={{
    width: "100%",
    overflowX: "auto", 
    display: "block",
  }}
>
        <Table sx={{ border: "1px solid black", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Transaction ID</TableCell>
              <TableCell sx={cellStyle}>Property Name</TableCell>
              <TableCell sx={cellStyle}>Role</TableCell>
              <TableCell sx={cellStyle}>Property Value</TableCell>
              <TableCell sx={cellStyle}>Payment Type</TableCell>
              <TableCell sx={cellStyle}>Company Commission</TableCell>
              <TableCell sx={cellStyle}>Payment Method</TableCell>
              <TableCell sx={cellStyle}>Transaction Date</TableCell>
              {selectedRole.toLowerCase() !== "client" && (
                <TableCell sx={cellStyle}>Action</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} sx={noDataStyle}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell sx={cellBodyStyle}>{transaction.transaction_id}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.property_name}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    {transaction.role === "Agent" ? "Team" : transaction.role}
                  </TableCell>

                  <TableCell sx={cellBodyStyle}>{transaction.property_value || "N/A"}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.payment_type || "N/A"}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.company_commission}</TableCell>
                  <TableCell sx={cellBodyStyle}>{transaction.payment_mode || "cash"}</TableCell>
                  <TableCell sx={cellBodyStyle}>
                    {new Date(transaction.transaction_date).toLocaleDateString("en-IN")}
                  </TableCell>
                  {selectedRole.toLowerCase() !== "client" && (
                    <TableCell sx={cellBodyStyle}>
                      {transaction.company_commission_status === "paid" ? (
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => navigate(`/a-commission/${transaction.transaction_id}`)}
                          sx={{ textTransform: "none" }}
                        >
                          View Commission
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handlePayCommission(transaction)}
                          sx={{ textTransform: "none" }}
                        >
                          Distribute Commission
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} sx={noDataStyle}>
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Box>

        {/* Pagination Controls */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "0px"  // <-- removes the rounded corners, making them square
              }
            }}
          />
        </Box>

      </Container>
    </>
  );
};

export default Tmoniter;
