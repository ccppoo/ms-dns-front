import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

import { useNavigate } from '@tanstack/react-router';

import { FlexBox, Image } from '@/components/styled';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  border: '1px transparent solid',
  margin: 1,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    border: 'none',
    borderRadius: 3,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

export default function TitleLogoHeader() {
  const naivigate = useNavigate();

  const mcserver = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';
  const mcserver2 = 'https://cdn.mc-server.kr/static/mc-server-logo-450x200.png';
  const mcserver3 = 'https://cdn.mc-server.kr/static/mc-server-logo-black-450x200.png';

  // function showNotification() {
  //   notificationsActions.push({
  //     options: {
  //       // Show fully customized notification
  //       // Usually, to show a notification, you'll use something like this:
  //       // notificationsActions.push({ message: ... })
  //       // `message` accepts string as well as ReactNode
  //       // If you want to show a fully customized notification, you can define
  //       // your own `variant`s, see @/sections/Notifications/Notifications.tsx
  //       variant: 'customNotification',
  //     },
  //     message: getRandomJoke(),
  //   });
  // }

  const onClickTitle = () => {
    naivigate({
      to: '/',
    });
  };
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <ImageButton
        focusRipple
        key={'logo-button'}
        style={{
          width: 76,
          height: 32,
          transition: 'background-color 1000ms linear',
        }}
        onClick={onClickTitle}
      >
        <Image src={mcserver3} />
      </ImageButton>
    </FlexBox>
  );
}
