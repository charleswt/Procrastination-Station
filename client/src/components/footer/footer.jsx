import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Links() {
  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
        position: 'fixed',
        bottom: 0,
      }}
    >

      <Link href="/">Home</Link>
      <Link href="/Terms">Terms & Conditions</Link>
      <Link href="/Contact">Contact Us</Link>
    </Box>
  );
}
