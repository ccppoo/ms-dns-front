import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Divider, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { join } from 'path';

import { FlexBox, FlexPaper, FullSizeCenteredFlexBox } from '@/components/styled';
import { rangeArray } from '@/utils/itertools';

import type { BoardPostTitle, OutputSchemaType } from '../models';
import type { ServerPostSchema } from './models';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

interface ServerVersionIntf {
  readOnly: boolean;
}

interface IMinecraftVersionCheckBox {
  major: number;
  minor: number;
  patchMin: number;
  patchMax: number;
}

function MinecraftVersionCheckBox(props: IMinecraftVersionCheckBox) {
  const methods = useFormContext<ServerPostSchema>();

  const { major, minor, patchMin, patchMax } = props;

  const versions: string[] = rangeArray(patchMin, patchMax).map((patchVersion) =>
    patchVersion > 0 ? `${major}.${minor}.${patchVersion}` : `${major}.${minor}`,
  );
  const versionSelected = methods
    .watch('minecraft_info.version')!
    .filter((vSelected) => versions.includes(vSelected));

  const allSelected = versionSelected.length == versions.length;

  const onClickVersion_x = () => {
    if (!allSelected) {
      const otherVersionValues = methods
        .getValues('minecraft_info.version')!
        .filter((vSelected) => !versions.includes(vSelected));
      methods.setValue('minecraft_info.version', [...otherVersionValues, ...versions]);
      return;
    }
    if (allSelected) {
      const otherVersionValues = methods
        .getValues('minecraft_info.version')!
        .filter((vSelected) => !versions.includes(vSelected));
      methods.setValue('minecraft_info.version', [...otherVersionValues]);
    }
  };

  const onClickVersion = (thisVersion: string) => {
    const selectedVersions = methods.getValues('minecraft_info.version')!;
    if (selectedVersions.includes(thisVersion)) {
      const otherVersionValues = selectedVersions.filter((vSelected) => vSelected != thisVersion);
      methods.setValue('minecraft_info.version', [...otherVersionValues]);
    } else {
      const otherVersionValues = methods.getValues('minecraft_info.version')!;
      methods.setValue('minecraft_info.version', [...otherVersionValues, thisVersion]);
    }
  };

  return (
    <FlexBox>
      <FlexBox sx={{ flexDirection: 'column', justifyContent: 'start' }}>
        <FormControlLabel
          label={`${major}.${minor}.x`}
          control={
            <Checkbox
              checked={allSelected}
              indeterminate={!allSelected && versionSelected.length > 0}
              onChange={onClickVersion_x}
            />
          }
        />
      </FlexBox>
      <Divider flexItem orientation="vertical" />
      <FlexBox sx={{ flexWrap: 'wrap' }}>
        {versions.map((patchVersion) => (
          <FormControlLabel
            label={patchVersion}
            control={
              <Checkbox
                checked={methods.watch('minecraft_info.version')!.includes(patchVersion)}
                onChange={() => onClickVersion(patchVersion)}
              />
            }
            key={`mc-version-check-${major}.${minor}.${patchVersion}`}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
}

type MinecraftPatchVersion = {
  min: number;
  max: number;
};

type MinecraftMinorVersion = {
  [minorVersion: number]: MinecraftPatchVersion;
};

type MinecraftVersions = {
  [majorVersion: number]: MinecraftMinorVersion;
};

interface IMinecraftLauncherCheckbox {
  launchers: string[];
}

function MinecraftLauncher(props: IMinecraftLauncherCheckbox) {
  const methods = useFormContext<ServerPostSchema>();

  const { launchers } = props;

  const onClickLauncher = (launcherName: string) => {
    const selectedVersions = methods.getValues('minecraft_info.launcher')!;
    if (selectedVersions.includes(launcherName)) {
      const otherVersionValues = selectedVersions.filter((vSelected) => vSelected != launcherName);
      methods.setValue('minecraft_info.launcher', [...otherVersionValues]);
    } else {
      const otherVersionValues = methods.getValues('minecraft_info.launcher')!;
      methods.setValue('minecraft_info.launcher', [...otherVersionValues, launcherName]);
    }
  };

  return (
    <FlexBox sx={{ flexWrap: 'wrap' }}>
      {launchers.map((launcher) => (
        <FormControlLabel
          label={launcher}
          control={
            <Checkbox
              checked={methods.watch('minecraft_info.launcher')!.includes(launcher)}
              onChange={() => onClickLauncher(launcher)}
            />
          }
          key={`mc-launcher-check-${launcher}`}
        />
      ))}
    </FlexBox>
  );
}

export default function MinecraftInfo(props: ServerVersionIntf) {
  const { readOnly } = props;
  const methods = useFormContext<ServerPostSchema>();

  // TODO: 서버에서 버전 정보 가져오기
  const versions: MinecraftVersions = {
    1: {
      15: { min: 0, max: 2 },
      16: { min: 0, max: 5 },
      17: { min: 0, max: 1 },
      18: { min: 0, max: 2 },
      19: { min: 0, max: 4 },
      20: { min: 0, max: 6 },
      21: { min: 0, max: 4 },
    },
  };

  const launchers: string[] = ['바닐라', 'CurseForge'];
  const formPath = 'minecraft_info.launcher' as FieldPath<ServerPostSchema>;
  // type FormDataType = PathValue<T, FieldPath<T>>;

  const helperText = methods.formState.errors.title?.message
    ? 'Please input creator username'
    : undefined;

  const titleValue = methods.getValues(formPath);

  if (!readOnly) {
    return (
      <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
        <Typography>마크 런처</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <MinecraftLauncher launchers={launchers} />
        </FlexPaper>

        <Typography>마크 버전</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          {Object.entries(versions)
            .toSorted(([mjorV1], [mjorV2]) => Number.parseInt(mjorV2) - Number.parseInt(mjorV1))
            .flatMap(([majorVersion, m_version]) =>
              Object.entries(m_version)
                .toSorted(
                  ([minorV1], [minorV2]) => Number.parseInt(minorV2) - Number.parseInt(minorV1),
                )
                .map(([m_version, { min, max }]) => (
                  <MinecraftVersionCheckBox
                    major={Number.parseInt(majorVersion)}
                    minor={Number.parseInt(m_version)}
                    patchMin={min}
                    patchMax={max}
                    key={`mc-version-select-${majorVersion}.${m_version}.x`}
                  />
                )),
            )}
        </FlexPaper>
      </FlexBox>
    );
  }

  const readLaunchers = methods.getValues('minecraft_info.launcher')!;
  const readVersions = methods.getValues('minecraft_info.version')!;

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>마크 런처</Typography>
        <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1 }}>
          {/* <MinecraftLauncher launchers={launchers} /> */}
          {readLaunchers.map((launcher, idx) => (
            <FlexPaper sx={{ paddingX: 1 }} key={`server-launcher-${idx}`}>
              <Typography>{launcher}</Typography>
            </FlexPaper>
          ))}
        </FlexBox>
      </FlexBox>

      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>마크 버전</Typography>
        <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1 }}>
          {readVersions.map((launcher, idx) => (
            <FlexPaper sx={{ paddingX: 1 }} key={`server-launcher-${idx}`}>
              <Typography>{launcher}</Typography>
            </FlexPaper>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
