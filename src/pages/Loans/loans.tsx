import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { NavBar } from '../../components/NavBar';

const LoansPage: React.FC = () => {
    return (
        <Box>
            <div>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: 'grey', height: '80px' }}>

                    </Toolbar>
                </AppBar>
                <Container>
                    <Box mt={2}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to the Loans Page
                        </Typography>
                        <Typography variant="body1">
                            Here you can manage all your loans.
                        </Typography>
                    </Box>
                </Container>
            </div>
            <NavBar />
        </Box>
    );
};

export default LoansPage;