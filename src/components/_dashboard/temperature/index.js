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
const CIRCLE_WIDTH = "100%";
const CIRCLE_HEIGHT = 100;
const MIN_WIDTH= 200;
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
    var room = '/livingtemp';
    if (this.props.room === 'office') {
      room = '/officetemp';
    }
    fetch(gateway + room)
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
              <Grid style={{display: 'flex', flexDirection: 'row'}} item>
                <div style={{ width: CIRCLE_WIDTH, height: CIRCLE_HEIGHT, minWidth: MIN_WIDTH }} className="content-temparature">
                  <p>Room temparature</p>
                  <h1>{this.state.temperature}°C</h1>
                  {/* <CircularProgressbar value={this.state.temperature} maxValue={50} text={this.state.temperature + '°C'} styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '18px',
                        pathColor: '#fff',
                        textColor: '#ffffff',
                        trailColor: '#d597e0',
                        backgroundColor: '#ffffff',
                      })} /> */}
                </div>
                <div style={{ width: CIRCLE_WIDTH, height: CIRCLE_HEIGHT , minWidth: MIN_WIDTH}} className="content-temparature">
                  <p>Humidity</p>
                  <h1>{this.state.humidity}%</h1>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}
export default Temperature;
