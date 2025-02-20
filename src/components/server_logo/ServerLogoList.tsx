import { CircularProgress, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import serverLogoApi from '@/api/logo';
import { FlexBox, FlexPaper } from '@/components/styled';

import ServerLogoPreview from './ServerLogoPreview';

const USER_SERVER_LOGO_MAX = 4;

interface IServerLogoList {
  editable?: boolean;
  showUrl?: boolean;
  uid: string;
}

export default function ServerLogoList(props: IServerLogoList) {
  const { editable, uid, showUrl } = props;

  const { data } = useQuery({
    queryFn: serverLogoApi.queryFn.getUserServerLogoList,
    queryKey: ['get server logo', uid],
    enabled: !!uid,
  });

  if (data) {
    const logo_cnt = data.logos.length;
    const empty = USER_SERVER_LOGO_MAX - logo_cnt;
    // console.log(`data : ${JSON.stringify(data)}`);
    return (
      <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
        <FlexBox>
          <Typography variant="h5">서버 아이콘</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <Typography variant="subtitle1">업로드 가능한 로고</Typography>
          <Typography variant="subtitle1">
            {logo_cnt}/{USER_SERVER_LOGO_MAX}
          </Typography>
        </FlexBox>
        <FlexPaper sx={{ flexWrap: 'wrap', padding: 1, rowGap: 1, justifyContent: 'space-around' }}>
          {data.logos.map(({ url, id }) => (
            <ServerLogoPreview
              editable={editable}
              logo_id={id}
              key={`server-logo-${id}`}
              showUrl={!!showUrl}
            />
          ))}
          {[...Array(empty).keys()].map((_, idx) => (
            <ServerLogoPreview editable={editable} key={`empty-user-subdomain-${idx}`} />
          ))}
        </FlexPaper>
      </FlexBox>
    );
  }
  return (
    <FlexBox>
      <CircularProgress />
    </FlexBox>
  );
}
