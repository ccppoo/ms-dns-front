import type { ReactElement, ReactNode} from 'react';
import React, { Suspense } from 'react';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { FullSizeCenteredFlexBox } from './styled';

interface ISuspenseLoading {
  children: ReactNode;
  customFallback?: ReactElement;
}

function DefaultFallback() {
  return (
    <Container maxWidth={'md'}>
      <FullSizeCenteredFlexBox>
        <Typography>Loading...</Typography>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default function SuspenseLoading(props: ISuspenseLoading) {
  const { children, customFallback } = props;

  return <Suspense fallback={customFallback || <DefaultFallback />}>{children}</Suspense>;
}
