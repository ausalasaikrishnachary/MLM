import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Chip,
} from '@mui/material';
import PartnerHeader from '../../../Shared/Partner/PartnerNavbar';

const Subcrptionplan = () => {
  const [selectedValue, setSelectedValue] = useState('Advanced_1 Month');
  const [selectedPlan, setSelectedPlan] = useState({
    name: 'Advanced',
    duration: '1 Month',
    price: 1439,
  });

  const handleSelection = (name, duration, price) => {
    setSelectedValue(`${name}_${duration}`);
    setSelectedPlan({ name, duration, price });
  };

  const plans = [
    {
      name: 'Advanced',
      type: 'Self service',
      highlight: null,
      color: '#E3F2FD',
      description: 'Upto 5 times more responses',
      options: [
        { duration: '1 Month', price: 1439, perMonth: '₹1,439' },
        { duration: '2 Months', price: 2039, perMonth: '₹1,019/month' },
        { duration: '3 Months', price: 2398, perMonth: '₹799/month' },
      ],
    },
    {
      name: 'Advanced Plus',
      type: 'Self service',
      highlight: 'Most Bought',
      color: '#F3E5F5',
      description: 'Upto 7 times more responses + Social media ads',
      options: [
        { duration: '4 Months', price: 7108, perMonth: '₹1,777/month' },
      ],
    },
    {
      name: 'Assist Plus',
      type: 'Assisted',
      highlight: null,
      color: '#FFF3E0',
      description: 'Relationship manager + upto 8 times more responses',
      options: [
        { duration: '3 Months', price: 23107, perMonth: '₹7,702/month' },
        { duration: '6 Months', price: 32349, perMonth: '₹5,391/month' },
      ],
    },
  ];

  return (
    <>
      <PartnerHeader />
      <Box sx={{ p: 4, pb: 16 }}>
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.name}>
              <Card
                sx={{
                  backgroundColor: plan.color,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: 300,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{plan.name}</Typography>
                    <Typography variant="caption">{plan.type}</Typography>
                  </Box>

                  {plan.highlight && (
                    <Chip
                      label={plan.highlight}
                      size="small"
                      color="warning"
                      sx={{ mt: 1, mb: 1 }}
                    />
                  )}

                  <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
                    {plan.description}
                  </Typography>

                  <RadioGroup value={selectedValue}>
                    {plan.options.map((opt) => {
                      const optionValue = `${plan.name}_${opt.duration}`;
                      return (
                        <FormControlLabel
                          key={opt.duration}
                          value={optionValue}
                          control={<Radio />}
                          onClick={() =>
                            handleSelection(plan.name, opt.duration, opt.price)
                          }
                          label={
                            <Box>
                              <Typography variant="body2">{opt.duration}</Typography>
                              <Typography variant="caption">{opt.perMonth}</Typography>
                            </Box>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Fixed Footer Section */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)',
            px: 4,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {selectedPlan.name} • {selectedPlan.duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ₹{selectedPlan.price} incl tax{' '}
              <span
                style={{
                  color: '#1976d2',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Payment Summary
              </span>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ₹{selectedPlan.price}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#001e3c',
                '&:hover': { backgroundColor: '#003060' },
                borderRadius: '8px',
                px: 3,
              }}
            >
              Buy Now &nbsp; →
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Subcrptionplan;
