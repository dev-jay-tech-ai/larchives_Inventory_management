import { Box, Typography } from '@mui/material'
import { Link } from "react-router-dom"
import logo from '../../assets/logo.svg' 

const primary = '#6439ff'

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'white',
      }}
    >
      <Link to="/" style={{ textDecoration: "none", textAlign: 'center', marginBottom: '4rem' }}>
        <img src={logo} alt="Logo" className="logo" style={{ width: '80%', verticalAlign: 'middle' }} />
      </Link>
      <Typography variant="h2" style={{ color: primary, marginBottom: '1rem' }}>
      Coming Soon
      </Typography>
      <Typography variant="h6" style={{ color: primary, marginBottom: '5rem' }}>
      Our system is under construction
      </Typography>
      <Link
        to="/"
        style={{
          backgroundColor: primary,
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none'
        }}
      >
        Back Home
      </Link>
    </Box>
  );
}