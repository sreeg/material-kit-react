import React from 'react';
import { mdiMovieOpen, mdiWallSconceFlat, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights, mdiCheckboxBlankCircleOutline, mdiCircle } from '@mdi/js';
import { GiExitDoor, GiEntryDoor, GiCandleFlame } from 'react-icons/gi';
import { MdBedtime } from 'react-icons/md';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';

const gateway = 'http://192.168.88.122:1880';
const ICON_HEIGHT= 42;

class Contactsensors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      balconydoorsensor: 'CLOSED'
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }
  handleBalconyDoorSensor = (e) => {
    fetch(gateway + '/balconydoorsensor/').then((response) => response.json());
  };
  componentDidMount() {
    this.updateTimer = setInterval(() => window.location.reload(), 300000);
    var that = this;
    fetch(gateway + '/balconydoorsensor')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ balconydoorsensor: data.contact });
        this.setState({ loading: false });
      });
    }

  render() {
    return (
      <>
      {this.state.loading ? (
        <div>Loading</div>
      ) : (
      <>
        <Grid container spacing={2}>
          <Grid item>
              <div className="content">
                <Icon path={mdiMovieOpen} size={1.5} />
                <div>Door Open</div>
              </div>
          </Grid>
              
        </Grid>
      </>
      )}
      </>
    );
  }
}
export default Scenes;
