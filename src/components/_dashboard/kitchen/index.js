import React from 'react';
import Switch from '../common/Switch';
import Curtain from '../common/Curtain';
import Zone from '../common/Zone';
import Fan from '../common/Fan';
import { mdiLightbulbVariantOutline, mdiLedStripVariant, mdiCoachLamp, mdiWaterBoiler, mdiStringLights } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { decodeHtml } from '../../../utils/commons';

const gateway = 'http://192.168.88.122:1880';
class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      kicenterzone: 'OFF',
      kiwalllamp: 'OFF',
      kicolor: 5,
      kibrightness: 5
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  handleColor = (e, v) => {
    switch (v) {
      case 1:
        v = 0;
        break;
      case 2:
        v = 25;
        break;
      case 3:
        v = 50;
        break;
      case 4:
        v = 75;
        break;
      case 5:
        v = 100;
        break;
    }
    fetch(gateway + '/kicolor/' + v).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/kibrightness/' + v * 20).then((response) => response.json());
  };

  componentDidMount() {
    var that = this;
    fetch(gateway + '/kiboardmainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        var speed = data['1'].speed;
        this.setState({ kbrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ kcolor: Math.round(speed / 20) });
        this.setState({ kaczone: data['5'].power });
        this.setState({ kcenterzone: data['3'].power });
        this.setState({ kwardrobe: data['7'].power });
      });
    fetch(gateway + '/kiboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ kfanspeed: Math.round(speed / 20) });
        this.setState({ mlight2: data['2'].power });
        this.setState({ mlight3: data['3'].power });
        this.setState({ mlight4: data['4'].power });
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
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Zones"
              />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Zone sVal={this.state.kicenterzone} zoneClass="zone23 zone23center" sID="kcenterzone" sIcon={mdiStringLights} sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.kcolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.kbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Switches"
              />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Switch sVal={this.state.kwalllamp} sID="kwalllamp" sIcon={mdiCoachLamp} sName="Wall lamp" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </>
    );
  }
}
export default Kitchen;
