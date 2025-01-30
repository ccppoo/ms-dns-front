import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';

import { Link, useNavigate } from '@tanstack/react-router';

import api from '@/api/post';
import useUserProfile from '@/hooks/useUserProfile';
import type { PostTopic } from '@/types/post';

import { FlexBox, FlexPaper } from '../styled';

interface IPostManagements {
  topic: PostTopic;
  postID: string | number;
  creator: string;
}

interface IPostEdit {
  topic: PostTopic;
  postID: string | number;
}
function PostEditDelete(props: IPostEdit) {
  const { postID, topic } = props;

  const navigate = useNavigate();
  const onClickDeletePostOwner = async () => {
    // pop-up warning
    const resp = await api.query.deleteBoardPost({ postID: postID, topic: topic });
    if (resp.status != 200) {
      // 권한 없음
    }
    // ok ->
    navigate({ to: `/${topic}/list` });
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
        onClick={onClickDeletePostOwner}
      >
        삭제하기
      </Paper>
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

export default function PostManagements(props: IPostManagements) {
  const { topic, postID, creator } = props;
  const [{ uid, role }] = useUserProfile();

  const isCreator = uid == creator;
  const isAdmain = role == 'admin';
  console.log(`isCreator : ${isCreator} isAdmain : ${isAdmain}`);
  return (
    <FlexBox sx={{ justifyContent: 'end' }}>
      {isCreator && <PostEditDelete postID={postID} topic={topic} />}
      {!isCreator && isAdmain && <PostAdminManage postID={postID} topic={topic} />}
    </FlexBox>
  );
}
