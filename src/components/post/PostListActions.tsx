import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Paper, Typography } from '@mui/material';

import { Link } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import type { PostTopic } from '@/types/post';

interface IWriteNewPost {
  topic: PostTopic;
}

function WriteNewPost(props: IWriteNewPost) {
  const { topic } = props;
  return (
    <Paper
      sx={{
        display: 'flex',
        columnGap: 0.5,
        paddingX: 0.5,
        paddingY: 0.2,
        textDecoration: 'none',
        flexGrow: 0,
      }}
      style={{ color: 'black' }}
      component={Link}
      to={`/${topic}/edit`}
    >
      <EditOutlinedIcon />
      <Typography>새로 쓰기</Typography>
    </Paper>
  );
}

interface IPostListActions {
  adminOnly?: boolean;
  topic: PostTopic;
}
export default function PostListActions(props: IPostListActions) {
  /**
   * 게시물 목록 페이지에서 쓰기, 등 클릭하는거
   */
  const { adminOnly, topic } = props;
  const [{ uid, role }] = useUserProfile();

  const isMember = !!uid;
  const isAdmain = isMember && role == 'admin';

  const showActions = adminOnly ? isMember : isAdmain;
  return (
    <FlexBox sx={{ justifyContent: 'end', alignItems: 'center' }}>
      {showActions && <WriteNewPost topic={topic} />}
    </FlexBox>
  );
}
