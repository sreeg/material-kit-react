import './switch.css';
import React from 'react';
import Icon from '@mdi/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

const gateway = 'http://192.168.88.122:1880';
class ColorAndBrightness extends React.Component {
  constructor(props) {
    super(props);
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
    fetch(gateway + '/lcolor/' + v).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/lbrightness/' + v * 20).then((response) => response.json());
  };

  render() {
    let { cDefaultValue, bDefaultValue, sColor, sBrightness, stateHandler } = this.props;

    return (
      <Grid>
        <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0, flex: 1 }}>
          <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, padding: '13px', background: "#303134" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100, marginRight: 24, flex: 1 }}>
              <Typography sx={{ fontSize: 14 }} color="text.white" gutterBottom>
                Color
              </Typography>
              <Slider defaultValue={cDefaultValue} name={sColor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
            </div>
            <Divider  orientation="vertical" flexItem />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100, marginLeft: 18, flex: 1 }}>
              <Typography sx={{ fontSize: 14 }} color="text.white" gutterBottom>
                Brightness
              </Typography>
              <Slider defaultValue={bDefaultValue} name={sBrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
export default ColorAndBrightness;
