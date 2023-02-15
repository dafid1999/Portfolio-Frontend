import React from 'react';
import {Box, Link, Typography} from "@mui/material";

function Footer() {
  return (
    <>
        <Box
          component="footer"
          sx={{
            py: 1,
            px: 2,
            backgroundColor: "#82E971",
            borderTop: '3px solid #28F506',
            minHeight: '7vh'

          }}
        >
            <Typography pt={1.5} fontFamily="Exo" fontSize={24} bg="primary" variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                {new Date().getFullYear()}
                {' '}
                <Link href="/"  underline="none" color="text.secondary">
                    Twoje Portfolio
                </Link>
                {' - Kreator portfolio online.'}
            </Typography>
        </Box>
    </>
  );
}

export default Footer;