import { useState } from 'react';

import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link, useNavigate } from '@tanstack/react-router';

import { queryClient } from '@/api';
import api from '@/api/post';
import useUserProfile from '@/hooks/useUserProfile';
import type { PostTopic } from '@/types/post';

import { FlexBox, FlexPaper } from '../styled';

interface IPostDeleteAlert {
  open: boolean;
  onClose: () => void;
  onDeleteConfirm: () => Promise<void>;
}
function PostDeleteAlert(props: IPostDeleteAlert) {
  const { open, onClose, onDeleteConfirm } = props;

  const postDeleteMessage = '게시물을 삭제하겠습니까?';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{postDeleteMessage}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{/*  */}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => await onDeleteConfirm()}
          variant="contained"
          color="error"
          size="small"
          autoFocus
        >
          삭제하기
        </Button>
        <Button onClick={onClose} variant="outlined" color="info" size="small">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
interface IPostEdit {
  topic: PostTopic;
  postID: string | number;
}

function PostEditDelete(props: IPostEdit) {
  const { postID, topic } = props;

  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const requestDeletePost = async () => {
    setOpenDeleteAlert(false);

    const resp = await api.query.deleteBoardPost({ postID: postID, topic: topic });
    if (resp.status != 200) {
      // 권한 없음
      alert('권한이 없습니다');
      return;
    }
    await queryClient.refetchQueries({ queryKey: [`${topic} list`] });
    navigate({ to: `/${topic}/list` });
  };

  const onClickPostDelete = () => {
    setOpenDeleteAlert(true);
  };

  return (
    <FlexBox sx={{ columnGap: 0.6 }}>
      <Paper sx={{ paddingX: 1.2, paddingY: 0.5, backgroundColor: '#7bb4ed' }}>
        <Box
          component={Link}
          to={`/${topic}/edit?id=${postID}`}
          sx={{
            display: 'flex',
            width: '100%',
            textDecoration: 'none',
            fontSize: '0.8rem',
          }}
          style={{ color: 'black' }}
        >
          수정하기
        </Box>
      </Paper>
      <Paper
        sx={{ paddingX: 1.2, paddingY: 0.5, backgroundColor: '#fa7773' }}
        component={ButtonBase}
        onClick={onClickPostDelete}
      >
        삭제하기
      </Paper>
      <PostDeleteAlert
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onDeleteConfirm={requestDeletePost}
      />
    </FlexBox>
  );
}

function PostAdminManage(props: IPostEdit) {
  const { postID } = props;

  const onClickDeletePostOwner = () => {};

  return (
    <FlexBox>
      <Paper component={ButtonBase} onClick={onClickDeletePostOwner}>
        수정하기
      </Paper>
      <Paper component={ButtonBase} onClick={onClickDeletePostOwner}>
        삭제하기
      </Paper>
    </FlexBox>
  );
}
interface IPostManagements {
  topic: PostTopic;
  postID: string | number;
  creator: string;
}

export default function PostManagements(props: IPostManagements) {
  const { topic, postID, creator } = props;
  const [{ uid, role }] = useUserProfile();

  const isCreator = uid === creator;
  const isAdmain = role === 'admin';
  // console.log(`isCreator : ${isCreator} isAdmain : ${isAdmain}`);
  return (
    <FlexBox sx={{ justifyContent: 'end' }}>
      {isCreator && <PostEditDelete postID={postID} topic={topic} />}
      {!isCreator && isAdmain && <PostAdminManage postID={postID} topic={topic} />}
    </FlexBox>
  );
}
