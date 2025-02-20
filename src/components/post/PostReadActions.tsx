import { Box, Paper } from '@mui/material';

import { Link, useSearch } from '@tanstack/react-router';

import type { PostTopic } from '@/types/post';

import { FlexBox } from '../styled';

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
