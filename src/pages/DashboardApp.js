import { Box, Grid, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Page from '../components/Page';
import React from 'react';
import Scenes from '../components/_dashboard/Scenes';
import Temperature from '../components/_dashboard/temperature';
import NTabs from './../components/NavSectionTab';
import sidebarConfig from './../layouts/dashboard/SidebarConfig';

class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
  }

  routeChange(e) {
    window.location.href = '/dashboard/' + e;
  }

  render() {
    return (
      <Page title="Myhome E302">
        <Container maxWidth="xl">
          <Box sx={{ pb: 3 }}>
            <Typography variant="h4">Welcome, E302!</Typography>
          </Box>
          <NTabs navConfig={sidebarConfig} style={{ marginBottom: 24 }} />
          <Grid container spacing={2}>
            <Grid item sm={12} md={3} lg={3}>
              <Card>
                <CardContent>
                  <Temperature room="living" />
                </CardContent>
              </Card>
            </Grid>
            <Grid sm={12} md={9} item lg={9}>
              <Card style={{ margin: 8 }}>
                <CardContent>
                  <Scenes />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default DashboardApp;
