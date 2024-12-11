import { ReactElement, createContext, useContext, useEffect, useMemo, useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';

import { FlexBox, FlexPaper, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

import DomainOptionSettings from './DomainSettings';
import DomainRegisterFormProvider from './FormProvider';
import DomainSearchBar from './SearchBar';

export default function DomainRegister() {
  return (
    <Container sx={{ height: '100%' }} maxWidth={'lg'}>
      <DomainRegisterFormProvider>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}>
          <DomainSearchBar />
          <DomainOptionSettings />
        </FlexBox>
        <FlexBox
          sx={{
            width: '100%',
            // border: '1px black solid',
            justifyContent: 'end',
            // padding: 2,
            // maxWidth: MAX_WIDTH,
          }}
        >
          <Button variant="contained" type="submit">
            submit
          </Button>
        </FlexBox>
      </DomainRegisterFormProvider>
    </Container>
  );
}
