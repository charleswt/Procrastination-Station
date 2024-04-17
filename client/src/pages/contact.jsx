import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function Contact() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        position: 'relative',
        top: '25vh'
      }}
      noValidate
      autoComplete="off"
    >
        <h2> Enter Your Email: </h2>
      <Input defaultValue="Say Hi" inputProps={ariaLabel} /><br></br>
      <h2> Enter your message: </h2>
      <Input placeholder="Please Be Nice!" maxheight = "lg" inputProps={ariaLabel} />
    </Box>
  );
}
