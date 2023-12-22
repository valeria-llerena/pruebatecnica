import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', borderBottom: '1px solid #555' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          Technical Test
        </Typography>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/my-orders" 
            sx={{ 
              margin: '0 8px', 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            My Orders
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/add-order/0" 
            sx={{ 
              margin: '0 8px', 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Add Orders
          </Button>
          {/* Add more navigation links */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;