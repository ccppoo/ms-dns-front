import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { FlexBox } from '@/components/styled';

// import useTheme from '@/store/theme';
import MenuNavigation from './MenuNavigation';
import ProfileHeader from './ProfileHeader';
import GameSeriesHeader from './components/GameSeries';
import LanguageHeader from './components/Language';
import ThemeHeader from './components/Theme';
import TitleLogoHeader from './components/TitleLogo';

function Header() {
  const naviButtonSize = 35;
  const MainTitleWidth = 100;

  return (
    <AppBar color="default" position="sticky" sx={{ top: 0, paddingX: 0 }}>
      <Container maxWidth={'md'}>
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: 'space-between',
            paddingX: 0,
          }}
          style={{ padding: 0 }}
        >
          <FlexBox sx={{ columnGap: 1 }}>
            <TitleLogoHeader />
          </FlexBox>

          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <LanguageHeader />
            <ThemeHeader />
            <ProfileHeader />
          </FlexBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
