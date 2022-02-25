import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from '@mdi/react';
import { decodeHtml } from '../../../utils/commons';
import { mdiWater, mdiThermometer } from '@mdi/js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const gateway = 'http://192.168.88.122:1880';
class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      temperature: 'OFF',
      humidity: 'OFF'
    };
  }

  componentDidMount() {
    var that = this;
    fetch(gateway + '/temperature')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        console.log(data);
        this.setState({ temperature: data.temperature });
        this.setState({ humidity: data.humidity });
        this.setState({ loading: false });
      });
  }
  render() {
    var stateHandler = this.stateHandler;
    return (
      <>
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item>
                <Card style={{ background: '#ca7cd8', color: '#ffffff' }}>
                  <CardHeader
                    title={<Typography fontFamily='roboto' variant='h5' component='h2'>Temperature</Typography>}
                    action={
                      <Icon path={mdiThermometer} size={2} />
                    }
                  />
                  <CardContent>
                    <div style={{ width: 150, height: 150 }} className="content">
                      <CircularProgressbar value={this.state.temperature} maxValue={50} text={this.state.temperature + '°C'} styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '14px',
                        pathColor: '#fff',
                        textColor: '#ffffff',
                        trailColor: '#d597e0',
                        backgroundColor: '#ffffff',
                      })} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ background: '#ff6284', color: '#ffffff' }}>
                  <CardHeader
                    title={<Typography fontFamily='roboto' variant='h5' component='h2'>Humidity</Typography>}
                    action={
                      <Icon path={mdiWater} size={2} />
                    }
                  />
                  <CardContent>
                    <div style={{ width: 150, height: 150 }} className="content">
                      <CircularProgressbar value={this.state.humidity} maxValue={100} text={this.state.humidity} styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '14px',
                        pathColor: '#fff',
                        textColor: '#ffffff',
                        trailColor: '#ff829e',
                        backgroundColor: '#ffffff',
                      })} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}
export default Temperature;
