import React from 'react';
import Iconm from '@mdi/react';
import { Box, Grid, Container, Typography, Button, IconButton } from '@mui/material';
import { mdiHome, mdiTeddyBear, mdiBed, mdiSofa, mdiCountertop, mdiFoodForkDrink } from '@mdi/js';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import tvFill from '@iconify/icons-eva/tv-fill';
import monitorFill from '@iconify/icons-eva/monitor-fill';
import { InlineIcon } from '@iconify/react';
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange = (event, newValue) => {
    this.props.stateHandler(tab, newValue);
  };
  render() {
    return (
        <Box sx={{ flexGrow: 1, width: '100%', bgcolor: 'background.paper', mb: 3 }}>
        <Tabs
          value={this.props.tab}
          onChange={this.handleChange}
          aria-label="nav tabs example"
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 }
            }
          }}
        >
          {this.LinkTab('Home', '/dashboard/app', mdiHome, false)}
          {this.LinkTab('Drawing', '/dashboard/drawing', tvFill, true)}
          {this.LinkTab('Office', '/dashboard/office', monitorFill, true)}
          {this.LinkTab('Kids', '/dashboard/kids', mdiTeddyBear, false)}
          {this.LinkTab('Living', '/dashboard/living', mdiSofa, false)}
          {this.LinkTab('Dinning, Balcony', '/dashboard/balcony', mdiFoodForkDrink, false)}
          {this.LinkTab('Bedroom', '/dashboard/bedroom', mdiBed, false)}
          {this.LinkTab('Kitchen', '/dashboard/kitchen', mdiCountertop, false)}
        </Tabs>
      </Box>
    );
  }
  LinkTab(label, href, icon, isCustomm) {
    return (
      <Tab
        component="a"
        icon={!isCustomm ? <Iconm path={icon} width={18} height={18} /> : <InlineIcon width={'18'} icon={icon} />}
        iconPosition="start"
        onClick={(event) => {
          event.preventDefault();
        }}
        label={label}
        href={href}
      />
    );
  }
}
export default Header;
