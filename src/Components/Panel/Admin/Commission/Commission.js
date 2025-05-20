import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../Shared/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseURL/BaseURL';
import CommissionTableLayout from '../TableLayout'; // Update the path as needed

function Commission() {
    const [propertyData, setPropertyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${baseurl}/property/`)
            .then((response) => {
                const filteredData = response.data.filter(
                    (item) =>
                        item.status === 'sold' &&
                        item.agent_commission_balance !== null &&
                        parseFloat(item.agent_commission_balance) > 0
                );

                const uniqueByUserId = [];
                const userIds = new Set();

                for (const item of filteredData) {
                    if (!userIds.has(item.user_id)) {
                        userIds.add(item.user_id);
                        uniqueByUserId.push(item);
                    }
                }

                // Format data into displayable rows
                const tableRows = uniqueByUserId.map((property) => ({
                    AgentName: property.username,
                    ReferralID: property.referral_id,
                    PropertyName: property.property_title,
                    PropertyValue: property.total_property_value,
                    Status: property.status,
                    CreatedAt: new Date(property.created_at).toLocaleDateString('en-IN'),
                }));

                setPropertyData(tableRows);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const headers = [
        "Agent Name",
        "Agent Referral Id",
        "Property Name",
        "Property Value",
        "Property Status",
        "Created",
    ];

    const handleRowClick = (row) => {
        navigate(`/a-commissions/${row.userId}`);
    };

    return (
        <>
            <Header />
            <CommissionTableLayout
                title="Agent Commission"
                headers={headers}
                data={propertyData}
                loading={loading}
                onRowClick={handleRowClick}
            />
        </>
    );
}

export default Commission;
