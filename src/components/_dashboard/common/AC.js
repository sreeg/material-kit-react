import './ac.css';
import React from 'react';
import Icon from '@mdi/react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { mdiAirConditioner } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CardContent from '@mui/material/CardContent';

const gateway = 'http://192.168.88.122:1880';
class AC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onoff: this.props.sVal
    };
  }
  handleTemparature = (e) => {
    fetch(gateway + '/' + e.target.name + '/' + e.target.value).then((response) => response.json());
  };

  handleChange = (e, val) => {
    this.setState({ onoff: val });
    this.props.stateHandler(e.target.name, val);
    fetch(gateway + '/' + this.props.sName + '/' + val).then((response) => response.json());
  };

  render() {
    const { style } = this.state;
    let { sVal, sID, sName, stateHandler } = this.props;

    return (
      <Grid container pb={1} spacing={2} className='card-ac'>
        <Grid item>
          <Card sx={{ minWidth: 100, mb: 2 }}>
            <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: "16px 8px", background: "#303134" }}>
              <Icon style={{ marginLeft: 16, marginRight: 16 }} path={mdiAirConditioner} size={2} />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <ToggleButtonGroup
                  color="primary"
                  value={this.state.onoff}
                  exclusive
                  onChange={this.handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="on">ON</ToggleButton>
                  <ToggleButton value="off">OFF</ToggleButton>
                </ToggleButtonGroup>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControl sx={{ m: 1, minWidth: 90 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Temparature</InputLabel>
                    <Select
                      labelId="temparature-ac"
                      id="temparature-ac"
                      name={sName}
                      value={this.temp}
                      defaultValue={24}
                      onChange={this.handleTemparature}
                      autoWidth
                      label="Temparature"
                    >
                      <MenuItem value={18}>18</MenuItem>
                      <MenuItem value={19}>19</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={21}>21</MenuItem>
                      <MenuItem value={22}>22</MenuItem>
                      <MenuItem value={23}>23</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={26}>26</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
export default AC;
