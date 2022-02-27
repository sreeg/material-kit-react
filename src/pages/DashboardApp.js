import { Box, Grid, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Page from '../components/Page';
import React from 'react';
import Scenes from '../components/_dashboard/Scenes';
import Temperature from '../components/_dashboard/temperature';
import Header from '../components/_dashboard/Header';

class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
  }

  routeChange(e) {
    window.location.href = '/dashboard/' + e;
  }
  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  render() {
    var stateHandler = this.stateHandler;
    return (
      <Page title="Myhome E302">
        <Container maxWidth="xl">
          <Box sx={{ pb: 3 }}>
            <Typography variant="h4">Welcome, E302!</Typography>
          </Box>
          <Header tab={0} stateHandler={stateHandler.bind(this)}/>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6} lg={4}>
              <Temperature />
            </Grid>
            <Grid sm={12} md={6} item lg={8}>
              <Card style={{}}>
                <CardHeader title="Scenes" />
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
