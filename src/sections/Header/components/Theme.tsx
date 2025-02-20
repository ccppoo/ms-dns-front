import { FlexBox } from '@/components/styled';

export default function ThemeHeader() {
  // const [theme, themeActions] = useTheme();
  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    ></FlexBox>
  );
  // const isLightMode = theme == 'light';

  // return (
  //   <FlexBox
  //     sx={{
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}
  //   >
  //     <Tooltip title={isLightMode ? '다크모드' : '라이트모드'} arrow>
  //       <IconButton
  //         color="default"
  //         size="medium"
  //         onClick={themeActions.toggle}
  //         data-pw="theme-toggle"
  //       >
  //         {isLightMode ? (
  //           <LightModeOutlinedIcon style={{ fontSize: '24px' }} />
  //         ) : (
  //           <DarkModeIcon style={{ fontSize: '24px' }} />
  //         )}
  //       </IconButton>
  //     </Tooltip>
  //   </FlexBox>
  // );
}
