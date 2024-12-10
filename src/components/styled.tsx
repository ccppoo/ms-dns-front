import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const FlexBox = styled(Box)({
  display: 'flex',
});

const FlexPaper = styled(Paper)({
  display: 'flex',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  margin: 0,
});
const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ExternalLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
  // '&:hover': {
  //   textDecoration: 'underline',
  // },
});

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

const ExternalLinkNewTab = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ target = '_blank', rel = 'noopener noreferrer', ...props }, ref) => (
    <ExternalLink ref={ref} target={target} rel={rel} {...props} />
  ),
);

export {
  FlexBox,
  FlexPaper,
  Image,
  CenteredFlexBox,
  FullSizeCenteredFlexBox,
  VisuallyHiddenInput,
  ExternalLink,
  ExternalLinkNewTab,
};
