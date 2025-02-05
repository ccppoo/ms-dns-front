import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { uploadMCServerIcon } from '@/api/image/mcServerIconUpload';
import logoApi from '@/api/logo';
import type { UserServerLogo } from '@/api/logo';
import ServerLogoPreview from '@/components/server_logo/ServerLogoPreview';
import { FlexBox, FlexPaper, Image, VisuallyHiddenInput } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import type { ServerPostSchema } from '../models';

interface ISelectableServerLogoPreview {
  logo_id?: string;
  selected: boolean;
  onClick: () => void;
}

function SelectableServerLogoPreview(props: ISelectableServerLogoPreview) {
  const { logo_id, selected, onClick } = props;

  return (
    <FlexBox
      sx={{
        opacity: !!selected ? 1 : 0.7,
        border: !!selected ? '2px solid green' : '2px solid transparent',
        borderRadius: !!selected ? 1 : null,
      }}
      onClick={onClick}
    >
      <ServerLogoPreview logo_id={logo_id} notOpaqueOnDefault />
    </FlexBox>
  );
}

function GoToUploadServerLogo() {
  return (
    <Paper
      sx={{
        display: 'flex',
        columnGap: 0.5,
        paddingX: 0.5,
        paddingY: 0.2,
        textDecoration: 'none',
        flexGrow: 0,
        height: '100%',
        alignItems: 'center',
      }}
      style={{ color: 'black' }}
      component={Link}
      target="_blank"
      to={`/me/profile`}
    >
      <FileUploadOutlinedIcon />
      <Typography variant="body2">내 로고 업로드하기</Typography>
    </Paper>
  );
}

export default function ServerLogoSelect() {
  const methods = useFormContext<ServerPostSchema>();

  const server_logo = methods.watch('server_info.server_logo');

  const [{ uid }] = useUserProfile();
  const { data, refetch } = useQuery({
    queryFn: logoApi.queryFn.getUserServerLogoList,
    queryKey: ['get logo for create server profile', uid!],
    enabled: !!uid,
  });

  const onClickRefreshMyLogos = async () => {
    await refetch();
  };

  const onClickServerLogo = (logoID: string | undefined) => {
    methods.setValue('server_info.server_logo', logoID);
  };

  return (
    <FlexBox sx={{ alignItems: 'center', paddingY: 1 }}>
      {/* 서버 아이콘 */}
      <FlexBox
        sx={{
          width: 100,
          justifyContent: 'center',
        }}
      >
        <ServerLogoPreview editable={false} logo_id={server_logo} notOpaqueOnDefault />
      </FlexBox>
      <Divider flexItem orientation="vertical" />
      <FlexBox
        sx={{
          justifyContent: 'start',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          columnGap: 4,
        }}
      >
        <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
          <FlexBox sx={{ alignItems: 'center', height: 28 }}>
            <Typography variant="caption">기본 로고</Typography>
          </FlexBox>
          <SelectableServerLogoPreview
            onClick={() => onClickServerLogo(undefined)}
            selected={server_logo == undefined}
            key={`server-logo-select-default`}
          />
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <Typography variant="caption">내 로고</Typography>
            <IconButton size="small" onClick={onClickRefreshMyLogos}>
              <RefreshOutlinedIcon fontSize="inherit" />
            </IconButton>
          </FlexBox>

          <FlexBox sx={{ columnGap: 2, alignItems: 'center' }}>
            {data?.logos.map((logo, idx) => (
              <SelectableServerLogoPreview
                logo_id={logo.id}
                onClick={() => onClickServerLogo(logo.id)}
                selected={logo.id == server_logo}
                key={`server-logo-select-${logo.id}`}
              />
            ))}
            {!!data && data?.logos.length < 4 && <GoToUploadServerLogo />}
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}></FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
