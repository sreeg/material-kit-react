// material
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import Kids from '../components/_dashboard/kids';
import { InlineIcon } from '@iconify/react';
import {mdiBed } from '@mdi/js';
import NTabs from '../components/NavSectionTab';
import sidebarConfig from '../layouts/dashboard/SidebarConfig';

// ----------------------------------------------------------------------

export default function Office() {
  return (
    <Page title="Kids room">
      <Container maxWidth="xl">
        <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ pb: 3 }}>
          <InlineIcon width={'24'} icon={mdiBed} />
          <Typography style={{ display: 'inline', marginLeft: '8px' }} variant="h4">
            Kids Room
          </Typography>
        </Box>
        <NTabs navConfig={sidebarConfig} style={{marginBottom: 24}}/>
        <Kids />
      </Container>
    </Page>
  );
}
