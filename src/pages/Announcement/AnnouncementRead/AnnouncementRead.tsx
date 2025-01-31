import { useEffect, useRef } from 'react';

import { Box, Button, ButtonBase, Chip, Divider, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import userApi from '@/api/user';
import EditorReader from '@/components/editor/components/Reader';
import PostManagements from '@/components/post/PostManagements';
import PostreadActions from '@/components/post/PostReadActions';
import { FlexBox, FlexPaper } from '@/components/styled';
import { ExternalLinkNewTab, Image } from '@/components/styled';

import api from '../api';

interface IAnnouncementTitle {
  title: string;
}

function AnnouncementTitle(props: IAnnouncementTitle) {
  const { title } = props;
  return (
    <FlexBox>
      <Typography
        style={{
          fontSize: '2.5rem',
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
    </FlexBox>
  );
}
interface IAnnouncementHeader {
  creator: string;
  updated_at: Date;
  created_at: Date;
}

function AnnouncementHeader(props: IAnnouncementHeader) {
  const { creator, updated_at, created_at } = props;

  const { data, isSuccess } = useQuery({
    queryKey: ['user profile', creator],
    queryFn: userApi.queryFn.getUserProfile,
  });

  return (
    <FlexBox sx={{ columnGap: 1.5, flexDirection: 'column', rowGap: -0.4 }}>
      <FlexBox
        sx={{
          alignItems: 'center',
          columnGap: 0.5,
        }}
      >
        {isSuccess && data && (
          <>
            <Avatar src={data.profileImage} sx={{ width: 30, height: 30 }} />
            <Typography>{data.nickname}</Typography>
          </>
        )}
      </FlexBox>
      <Typography style={{ fontSize: '0.8rem', fontWeight: 100 }}>
        작성일 : {created_at.toLocaleDateString()} {created_at.toLocaleTimeString()}
      </Typography>
    </FlexBox>
  );
}

export default function AnnouncementRead() {
  const { postID } = useParams({
    from: '/announcement/read/$postID',
  });

  const { data: postData } = useQuery({
    queryKey: ['announcement', postID],
    queryFn: api.queryFn.getAnnouncementPost,
    enabled: !!postID,
  });

  if (postData) {
    const { title, creator, updated_at, created_at } = postData;
    console.log(`updated_at : ${updated_at}`);
    console.log(`created_at : ${created_at}`);
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          <AnnouncementTitle title={title!} />
          <AnnouncementHeader
            creator={creator!}
            updated_at={new Date(updated_at!)}
            created_at={new Date(created_at!)}
          />
          <PostManagements postID={postID} topic="announcement" creator={postData.creator!} />
          <EditorReader data={postData} />
          <PostreadActions topic="announcement" />
          <PostManagements postID={postID} topic="announcement" creator={postData.creator!} />
        </FlexBox>
      </Container>
    );
  }

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <CircularProgress />
      </FlexBox>
    </Container>
  );
}
