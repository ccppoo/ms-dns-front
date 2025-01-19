import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { FlexBox } from '@/components/styled';

import ProfileHeader from './ProfileHeader';
import MenuNavigation from './components/MenuNavigation';
import ThemeHeader from './components/Theme';
import TitleLogoHeader from './components/TitleLogo';

function Header() {
  return (
    <AppBar
      color="default"
      position="sticky"
      sx={{ top: 0, paddingX: 0, marginBottom: 1 }}
      elevation={3}
    >
      <Container maxWidth={'md'}>
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: 'space-between',
            paddingX: 0,
          }}
          style={{ padding: 0 }}
        >
          <FlexBox sx={{ columnGap: 2 }}>
            <TitleLogoHeader />
            <MenuNavigation />
          </FlexBox>

          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <ThemeHeader />
            <ProfileHeader />
          </FlexBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
