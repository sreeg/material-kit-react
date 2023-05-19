import React from 'react';
import * as _ from 'underscore';
import Switch from '../common/Switch';
import SwitchCustomIcon from '../common/SwitchCustomIcon';
import Curtain from '../common/Curtain';
import Zone from '../common/Zone';
import Fan from '../common/Fan';
import { mdiLightbulbVariantOutline, mdiWaterBoiler, mdiStringLights, mdiLedStripVariant, mdiAirConditioner, mdiVanityLight, mdiCellphoneDock } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { decodeHtml } from './../../../utils/commons';
import { FaPagelines } from 'react-icons/fa';
import { HexColorPicker } from 'react-colorful';
import './../common/common.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Temperature from '../temperature';
import addNotification from 'react-push-notification';

const gateway = 'http://192.168.88.122:1880';
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};
class OfficeRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      ofan: 'OFF',
      lines: 'OFF',
      olight3: 'OFF',
      olight4: 'OFF',
      olight5: 'OFF',
      olight6: 'OFF',
      olight7: 'OFF',
      olight8: 'OFF',
      ocenterzone: 'OFF',
      oaczone: 'OFF',
      owindowside: 'OFF',
      oac: 'OFF',
      oled: 'OFF',
      ofanspeed: 5,
      ocolor: 5,
      obrightness: 5,
      linesbrightness: 5,
      curtainbrightness: 5,
      osheer: 'CLOSE',
      oblackout: 'CLOSE',
      ogyser: 'OFF',
      color: '#FFFFFF',
      curtaincolor: '#FFFFFF',
      effects: [],
      selectedEffect: '',
      selectedCurtainEffect: 'off',
      updateTimer: 0
    };
    this.handleInputThrottled = _.throttle(this.handleLinesColor, 1000);
    this.handleCurtainInputThrottled = _.throttle(this.handleCurtainColor, 1000);
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  handleEffect = (e) => {
    console.log(e.target.value);
    this.setState({ selectedEffect: e.target.value });
    addNotification({
      title: 'Nano leaf',
      subtitle: 'New theme applied : ',
      message: e.target.value,
      theme: 'Blue',
      duration: 30000,
      backgroundTop: 'Blue', //optional, background color of top container.
      backgroundBottom: 'darkblue', //optional, background color of bottom container.
      colorTop: 'white', //optional, font color of top container.
      colorBottom: 'white', //optional, font color of bottom container.
      closeButton: 'X', //optional, text or html/jsx element for close text. Default: Close,
      native: false // when using native, your OS will handle theming.
    });
    fetch(gateway + '/lineseffect/' + e.target.value).then((response) => response.json());
  };

  handleCurtainEffect = (e) => {
    console.log(e.target.value);
    this.setState({ selectedCurtainEffect: e.target.value });
    fetch(gateway + '/curtaineffect/' + e.target.value).then((response) => response.json());
  };

  handleLinesColor = (e) => {
    this.setState({ color: e });
    fetch(gateway + '/linescolor/' + e.substring(1)).then((response) => response.json());
  };

  handleCurtainColor = (e) => {
    this.setState({ color: e });
    fetch(gateway + '/curtaincolor/' + e.substring(1)).then((response) => response.json());
  };

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
    fetch(gateway + '/ocolor/' + v).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/obrightness/' + v * 20).then((response) => response.json());
  };

  handleLBrightness = (e, v) => {
    fetch(gateway + '/linesbrightness/' + v * 20).then((response) => response.json());
  };

  handleCurtainBrightness = (e, v) => {
    fetch(gateway + '/curtainbrightness/' + v * 20).then((response) => response.json());
  };
  componentWillUnmount(){
    clearInterval(this.updateTimer);
  }
  componentDidMount() {
    this.updateTimer = setInterval(() => window.location.reload(), 300000);
    var that = this;
    fetch(gateway + '/osheercurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ osheer: data['1'].curtain });
      });
    fetch(gateway + '/ogyserstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ ogyser: data['2'].power });
      });
    fetch(gateway + '/oblackoutcurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ oblackout: data['1'].curtain });
      });
    fetch(gateway + '/getlineseffects')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ selectedEffect: data['selected'] });
        this.setState({ effects: data['available'] });
      });
    fetch(gateway + '/oboardmainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        var speed = data['1'].speed;
        this.setState({ obrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ ocolor: Math.round(speed / 20) });
        this.setState({ ocenterzone: data['5'].power });
        this.setState({ owindowside: data['7'].power });
        this.setState({ oaczone: data['3'].power });
      });
    fetch(gateway + '/oboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ ofan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ ofanspeed: Math.round(speed / 20) });
        this.setState({ lines: data['2'].power });
        this.setState({ olight3: data['3'].power });
        this.setState({ olight4: data['4'].power });
        this.setState({ olight5: data['5'].power });
        this.setState({ olight6: data['6'].power });
        this.setState({ olight7: data['7'].power });
        this.setState({ olight8: data['8'].power });
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
            <Card style={{ marginBottom: 24, padding: "0px 24px" }}>
              <CardContent style={{ background: "#303134", borderRadius: "16px"  }}>
                <Temperature room="office" />
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardContent>
                <Grid container pb={3} spacing={2}>
                  <Grid item>
                    <Zone sVal={this.state.oaczone} zoneClass="zone23 zone23top" sID="oaczone" sIcon={mdiStringLights} sName="AC" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.ocenterzone} zoneClass="zone23 zone23center" sID="ocenterzone" sIcon={mdiStringLights} sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.owindowside} zoneClass="zone23 zone23bottom" sID="owindowside" sIcon={mdiStringLights} sName="Window" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.olight3} zoneClass="zone23 zone23right" sID="olight3" sIcon={mdiLightbulbVariantOutline} sName="Right area" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.olight4} zoneClass="zone23 zone23left" sID="olight4" sIcon={mdiLightbulbVariantOutline} sName="Left area" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px', background: "#303134" }}>
                        <Typography sx={{ fontSize: 14 }} color="text.white">
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.ocolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px', background: "#303134" }}>
                        <Typography sx={{ fontSize: 14 }} color="text.white">
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.obrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container pb={3} spacing={2}>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.lines} sID="lines" sIcon={FaPagelines} sName="Nano lines" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  {this.state.lines === 'ON' ? (
                    <>
                      <Grid item>
                        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                          <InputLabel id="demo-simple-select-helper-label" style={{ color: 'white' }}>
                            Scene name
                          </InputLabel>
                          <Select style={{ color: 'white' }} label="Scene name" labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={this.state.selectedEffect} onChange={this.handleEffect}>
                            {this.state.effects.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.white">
                              Brightness
                            </Typography>
                            <Slider defaultValue={this.state.linesbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleLBrightness} />
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item>
                        <HexColorPicker color={this.state.color} onChange={this.handleInputThrottled} />
                      </Grid>
                    </>
                  ) : (
                    ''
                  )}
                  <Grid item>
                    <Switch sVal={this.state.olight5} sID="olight5" sIcon={mdiLightbulbVariantOutline} sName="Light 5" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.olight6} sID="olight6" sIcon={mdiVanityLight} sName="Curtain light" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  {this.state.olight6 === 'ON' ? (
                    <>
                      <Grid item>
                        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                          <InputLabel id="demo-simple-select-helper-label" style={{ color: 'white' }}>
                            Scene name
                          </InputLabel>
                          <Select style={{ color: 'white' }} label="Scene name" labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={this.state.selectedCurtainEffect} onChange={this.handleCurtainEffect}>
                            <MenuItem key="off" value="off">
                              None
                            </MenuItem>
                            <MenuItem key="cool" value="153">
                              Coolest
                            </MenuItem>
                            <MenuItem key="cool" value="250">
                              Cool
                            </MenuItem>
                            <MenuItem key="cool" value="370">
                              Neutral
                            </MenuItem>
                            <MenuItem key="cool" value="454">
                              Warm
                            </MenuItem>
                            <MenuItem key="warm" value="500">
                              Warmest
                            </MenuItem>
                            <MenuItem key="color" value="Color">
                              Color
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                            <Typography sx={{ fontSize: 14 }} color="text.white">
                              Brightness
                            </Typography>
                            <Slider defaultValue={this.state.curtainbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleCurtainBrightness} />
                          </CardContent>
                        </Card>
                      </Grid>
                      {this.state.selectedCurtainEffect === 'Color' ? (
                        <>
                          <Grid item>
                            <HexColorPicker color={this.state.curtaincolor} onChange={this.handleCurtainInputThrottled} />
                          </Grid>
                        </>
                      ) : (
                        ''
                      )}
                    </>
                  ) : (
                    ''
                  )}
                  <Grid item>
                    <Switch sVal={this.state.olight7} sID="olight7" sIcon={mdiLightbulbVariantOutline} sName="WD warm" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.olight8} sID="olight8" sIcon={mdiLightbulbVariantOutline} sName="WD color" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.ogyser} sID="ogyser" sIcon={mdiWaterBoiler} sName="Gyser" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.serotv} sID="serotv" sIcon={mdiCellphoneDock} sName="Sero TV" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.oled} sID="oled" sIcon={mdiLedStripVariant} sName="LED" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.oac} sID="oac" sIcon={mdiAirConditioner} sName="AC" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>                       
                  {/* <Grid item>
                    <SwitchCustomIcon sVal={this.state.lines} sID="lines" sIcon={FaPagelines} sName="Nano Lines" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>                   */}
                </Grid>

                <Grid container spacing={2}>
                  <Grid item>
                    <Curtain sVal={this.state.osheer} sID="osheer" sName="Sheer curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Curtain sVal={this.state.oblackout} sID="oblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Fan sVal={this.state.ofan} sFval={this.state.ofanspeed} sID="ofan" sIDFS="ofanspeed" sName="Fan" stateHandler={stateHandler.bind(this)} />
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
export default OfficeRoom;
