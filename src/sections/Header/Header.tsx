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
    // <Box sx={{ width: '100%', position: 'sticky' }} data-pw={`theme-${theme}`}>
    <Box sx={{ width: '100%', position: 'sticky' }}>
      <AppBar color="transparent" elevation={1} position="sticky" sx={{ top: 0, paddingX: 0 }}>
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: 'space-between',
            borderBottom: '1px black solid',
          }}
        >
          <FlexBox sx={{ columnGap: 1 }}>
            <TitleLogoHeader />
            {/* <GameSeriesHeader /> */}
          </FlexBox>

          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <LanguageHeader />
            <ThemeHeader />
            <ProfileHeader />
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
