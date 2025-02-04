import { useState } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import { refetchQuery } from '@/api';
import { uploadMCServerIcon } from '@/api/image/mcServerIconUpload';
import serverLogoApi from '@/api/logo';
import { FlexBox, FlexPaper, Image, VisuallyHiddenInput } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

const DEFAULT_ICON = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

interface IPostDeleteAlert {
  open: boolean;
  onClose: () => void;
  msg: string;
}

function LogoStatusAlert(props: IPostDeleteAlert) {
  const { open, onClose, msg } = props;

  // const postDeleteMessage = '게시물을 삭제하겠습니까?';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{msg}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{/*  */}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="info" size="small">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface ILogoDeleteAlert {
  open: boolean;
  onClose: () => void;
  onDeleteConfirm: () => Promise<void>;
  logo_url?: string;
}

function LogoDeleteAlert(props: ILogoDeleteAlert) {
  const { open, onClose, logo_url, onDeleteConfirm } = props;

  const logoDeleteMessage = '서버 로고를 삭제하겠습니까?';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{logoDeleteMessage}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{/*  */}</DialogContentText>
        {/* NOTE: 여기에 로고 미리 보여주기 */}
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
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IServerLogoPreview {
  editable?: boolean;
  logo_id?: string;
}

export default function ServerLogoPreview(props: IServerLogoPreview) {
  const { editable, logo_id } = props;
  const [{ uid }] = useUserProfile();

  const server_logo = undefined;

  const [serverLogoDeleteAlertOpen, setServerLogoDeleteAlertOpen] = useState<boolean>(false);
  const [serverLogoAlertOpen, setServerLogoAlertOpen] = useState<boolean>(false);
  const [serverLogoAlertMSG, setServerLogoAlertMSG] = useState<string>('');

  const { data } = useQuery({
    queryFn: serverLogoApi.queryFn.getUserServerLogo,
    queryKey: ['server logo', logo_id!],
    enabled: !!logo_id,
    placeholderData: {
      id: '',
      url: DEFAULT_ICON,
    },
  });

  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    console.log(`이미지 업로드 중..`);
    const { success, file: file_ } = await uploadMCServerIcon(selectedFile);
    if (success != 1) {
      // console.log(`에러!`);
      setServerLogoAlertOpen(true);
      setServerLogoAlertMSG('이미지 사이즈 형식이 옯바르지 않습니다.');
      return;
    }
    const { url } = file_;
    const resp = await serverLogoApi.query.uploadServerLogo({ logo_url: url });
    if (resp.status != 200) {
      // 업로드 제한횟수 ㅇㅇ
      setServerLogoAlertOpen(true);
      setServerLogoAlertMSG('잘못된 요청입니다.');
    }
    await refetchQuery(['get server logo', uid!]);
    return;
  };

  const handleUpdateClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    console.log(`이미지 업로드 중..`);
    const { success, file: file_ } = await uploadMCServerIcon(selectedFile);
    if (success != 1) {
      // console.log(`에러!`);
      setServerLogoAlertOpen(true);
      setServerLogoAlertMSG('이미지 사이즈 형식이 옯바르지 않습니다.');
      return;
    }
    const { url } = file_;
    const resp = await serverLogoApi.query.updateServerLogo({ logo_id: logo_id!, logo_url: url });
    if (resp.status != 200) {
      // 중간에 다른 작업, 등등 잘못된 경우
      setServerLogoAlertOpen(true);
      setServerLogoAlertMSG('잘못된 요청입니다.');
      return;
    }
    await refetchQuery(['get server logo', uid!]);
    return;
  };

  const onDeleteConfirm = async () => {
    setServerLogoDeleteAlertOpen(true);
    // methods.setValue('server_info.server_logo', undefined);
    const resp = await serverLogoApi.query.deleteServerLogo({ logo_id: logo_id! });
    if (resp.status != 200) {
      // 중간에 다른 작업, 등등 잘못된 경우
      setServerLogoAlertOpen(true);
      setServerLogoAlertMSG('잘못된 요청입니다.');
      return;
    }
    await refetchQuery(['get server logo', uid!]);
    return;
  };

  return (
    <FlexBox
      sx={{
        width: '25%',
        maxWidth: 175,

        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: 1,
      }}
    >
      {!!data ? (
        <FlexPaper
          sx={{
            maxWidth: 96,
            aspectRatio: '1/1',
            maxHeight: 96,
            flexShrink: 0,
            padding: 0.5,
            justifyContent: 'center',
          }}
          elevation={3}
        >
          <Image
            src={data.url}
            sx={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              opacity: !!logo_id ? 1 : 0.5,
            }}
          />
        </FlexPaper>
      ) : (
        <FlexBox>
          <CircularProgress />
        </FlexBox>
      )}
      {editable && (
        <FlexBox sx={{ justifyContent: 'space-between' }}>
          <Button
            color="error"
            variant="contained"
            size="small"
            sx={{ paddingY: '2px', paddingX: '2px' }}
            startIcon={<DeleteOutlineOutlinedIcon />}
            disabled={!logo_id}
            onClick={() => setServerLogoDeleteAlertOpen(true)}
          >
            삭제
          </Button>
          <LogoDeleteAlert
            logo_url={data?.url}
            open={serverLogoDeleteAlertOpen}
            onClose={() => setServerLogoDeleteAlertOpen(false)}
            onDeleteConfirm={onDeleteConfirm}
          />
          {!!logo_id ? (
            <Button
              variant="outlined"
              disabled={!!server_logo}
              startIcon={<EditOutlinedIcon />}
              component={'label'}
              size="small"
            >
              수정하기
              <VisuallyHiddenInput
                type="file"
                multiple
                accept=".png"
                onChange={(e) => {
                  handleUpdateClick(e);
                }}
              />
            </Button>
          ) : (
            <Button
              variant="outlined"
              disabled={!!server_logo}
              startIcon={<FileUploadOutlined />}
              component={'label'}
              size="small"
            >
              업로드
              <VisuallyHiddenInput
                type="file"
                multiple
                accept=".png"
                onChange={(e) => {
                  handleUploadClick(e);
                }}
              />
            </Button>
          )}
        </FlexBox>
      )}
      <LogoStatusAlert
        open={serverLogoAlertOpen}
        onClose={() => {
          setServerLogoAlertOpen(false);
        }}
        msg={serverLogoAlertMSG}
      />
    </FlexBox>
  );
}
