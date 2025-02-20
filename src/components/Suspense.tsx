import React, { ReactElement, ReactNode, Suspense } from 'react';

import { FlexBox } from './styled';

interface ISuspenseLoading {
  children: ReactNode;
  customFallback?: ReactElement;
}

function DefaultFallback() {
  return <FlexBox>Loading...</FlexBox>;
}

export default function SuspenseLoading(props: ISuspenseLoading) {
  const { children, customFallback } = props;

  return <Suspense fallback={customFallback || <DefaultFallback />}>{children}</Suspense>;
}
