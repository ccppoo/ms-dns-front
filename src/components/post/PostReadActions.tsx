import { useState } from 'react';

import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link, useNavigate, useParams, useSearch } from '@tanstack/react-router';

import { queryClient } from '@/api';
import api from '@/api/post';
import useUserProfile from '@/hooks/useUserProfile';
import type { PostTopic } from '@/types/post';

import { FlexBox, FlexPaper } from '../styled';

interface IReturnToList {
  topic: PostTopic;
}
function ReturnToList(props: IReturnToList) {
  const { topic } = props;
  const path = `/${topic}/read/$postID`;

  const { page } = useSearch({
    from: path,
  });

  return (
    <Paper sx={{ paddingX: 1.2, paddingY: 0.5 }}>
      <Box
        component={Link}
        to={`/${topic}/list?page=${page}`}
        sx={{
          display: 'flex',
          width: '100%',
          textDecoration: 'none',
          fontSize: '0.8rem',
        }}
        style={{ color: 'black' }}
        resetScroll
      >
        목록으로
      </Box>
    </Paper>
  );
}

interface IPostreadActions {
  topic: PostTopic;
}

export default function PostreadActions(props: IPostreadActions) {
  const { topic } = props;

  // const { postID } = useParams({
  //   from: path,
  // });

  // console.log(`isCreator : ${isCreator} isAdmain : ${isAdmain}`);
  return (
    <FlexBox sx={{ justifyContent: 'end' }}>
      <ReturnToList topic={topic} />
    </FlexBox>
  );
}
