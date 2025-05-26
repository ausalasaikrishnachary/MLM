import React from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function FormLayout({ title, formData, loading, fields, onChange, onSubmit }) {
  /*
  fields: Array of field config objects like:
    {
      name: 'email',
      label: 'Email',
      type: 'text' | 'date' | 'time' | 'select' | 'textarea',
      required: true,
      options: ['option1', 'option2'], // only for select
      xs: 12,
      sm: 4
    }
  */

  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => {
            const { name, label, type, required, options, xs = 12, sm = 4, multiline, rows } = field;

            if (type === 'select') {
              return (
                <Grid item key={name} xs={xs} sm={sm}>
                  <FormControl fullWidth required={required}>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      name={name}
                      value={formData[name] || ''}
                      label={label}
                      onChange={onChange}
                    >
                      {options && options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              );
            }

            return (
              <Grid item key={name} xs={xs} sm={sm}>
                <TextField
                  fullWidth
                  name={name}
                  label={label}
                  type={type === 'textarea' ? 'text' : type}
                  multiline={type === 'textarea' || multiline}
                  rows={rows}
                  value={formData[name] || ''}
                  onChange={onChange}
                  required={required}
                  InputLabelProps={type === 'date' || type === 'time' ? { shrink: true } : undefined}
                />
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default FormLayout;
