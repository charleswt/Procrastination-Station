import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function handleClick(event) {
  event.preventDefault();
  alert("render login modal")
}

export default function ActiveLastBreadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        > Login
        </Link>
      </Breadcrumbs>
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <img src="../public/images/logo.webp" 
        sx={{ bgcolor: '#cfe8fc', height: '25vh' }}/>
      </Container>
    </React.Fragment>
    </div>
  );
}
