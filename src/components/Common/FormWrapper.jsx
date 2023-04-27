import React from 'react'
import { Container,Box, Typography } from '@mui/material'
const FormWrapper = ({title,children,mTop}) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ width: "95%" }}
      elevation="20"
    >
      <Box
        sx={{
          mt: mTop,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
          p: "2rem",
          borderRadius: "40px",
          boxShadow: 24,
        }}
      >
       <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
        </Box>
        </Container>
  )
}

export default FormWrapper