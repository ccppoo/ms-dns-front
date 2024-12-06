import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import Editor from './Editor';
import api from './api';
import { outputSchema, outputSchemaDefault } from './models';

export default function EditorWriteMode() {
  const [userProfile] = useUserProfile();

  // postID 있으면 편집모드
  // const postID = useParams({
  //   // from: '/editor/$postID',
  //   select: (params) => params.postID || undefined,
  //   strict: false,
  // });

  const postURL = 'asd';
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['write post', postURL!, userProfile.uid!],
    queryFn: api.queryFn.getPostCreateMode,
    // enabled: isPostEditMode,
  });

  // const queryEnabled = false && !!userProfile.uid;
  // const queryEnabled = !!postID;

  if (isSuccess && data) {
  }
  return (
    <Container sx={{ height: '100%' }} maxWidth={'lg'}>
      <Editor data={outputSchemaDefault} />
    </Container>
  );
}
