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
class DoorSensors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      roomName: "",
      contact: "false"
    };
  }

  componentDidMount() {
    var that = this;
    var room = '/balconydoorsensor';
    console.log(this.props.room);
    if (this.props.room === 'Service balcony') {
      room = '/servicebalconydoorsensor';
    }
    fetch(gateway + room)
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        console.log(data.contact);
        this.setState({ contact: data.contact+'' });
        this.setState({ roomName: that.props.room });
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
                  <p>{this.state.roomName} door closed?</p>
                  <h1>{this.state.contact}</h1>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}
export default DoorSensors;
