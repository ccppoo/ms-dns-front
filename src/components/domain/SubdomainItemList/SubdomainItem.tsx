import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { refetchQuery } from '@/api';
import domainApi from '@/api/domain';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import type { UserSubdomainInfo } from '@/schema/domain';
import { icon } from '@/static';

import SubdomainRecord from './SubdomainRecord';

function SubdomainRecordHeader() {
  const recordHeader_type = '레코드 종류';
  const recordHeader_name = '이름';
  const recordHeader_value = '값';
  return (
    <FlexBox sx={{ columnGap: 2, alignItems: 'center' }}>
      <FlexBox sx={{ flex: '1 1 15%', justifyContent: 'center' }}>
        <Typography variant="body1">{recordHeader_type}</Typography>
      </FlexBox>
      <FlexBox sx={{ flex: '1 1 40%', justifyContent: 'center' }}>
        <Typography>{recordHeader_name}</Typography>
      </FlexBox>
      <FlexBox sx={{ flex: '1 1 45%', justifyContent: 'center' }}>
        <Typography>{recordHeader_value}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export default function SubdomainItem({ userSubdomain }: { userSubdomain: UserSubdomainInfo }) {
  const fullDomain = `${userSubdomain.subdomain}.${userSubdomain.domain}`;

  const [originSubdomainInfo, setOriginSubdomainInfo] = useState<UserSubdomainInfo>(userSubdomain);
  const methods = useForm<UserSubdomainInfo>({
    defaultValues: userSubdomain,
  });

  const [isEditMode, setEditMode] = useState<boolean>(false);
  // const [subdomainRecords, setSubdomainRecords] = useState<UserSubdomainRecord[]>(
  //   userSubdomain.records,
  // );

  const subdomainRecords = methods.watch(`records`);

  const onClickAddSubdomainRecord = () => {
    // 비어있는 기록의 경우 ?
    const prevRecords = methods.getValues(`records`);
    methods.setValue(`records`, [...prevRecords, { name: '', recordType: 'SRV', values: [''] }]);
  };

  const onClickCancelEdit = () => {
    // 비어있는 기록의 경우 ?
    methods.reset();
    setEditMode(false);
    // const prevRecords = methods.getValues(`records`);
    // methods.setValue(`records`, [...prevRecords, { name: '', recordType: 'SRV', values: [''] }]);
  };

  const onClickAddMinecraftSRV = () => {
    const prevRecords = methods.getValues(`records`);
    const minecraftSRV_name = `_minecraft._tcp.${fullDomain}`;
    const minecraftSRV_value = `0 0 25565 ${fullDomain}`;
    methods.setValue(`records`, [
      ...prevRecords,
      { name: minecraftSRV_name, recordType: 'SRV', values: [minecraftSRV_value] },
    ]);
  };

  const onClickEditSubdomainRecord = () => {
    setEditMode((prev) => !prev);
    // TODO: 수정하기 누르고 -> 버튼 로딩상태, 성공하면 새로고침, 실패하면 취소,
  };

  const submit = async (formData: UserSubdomainInfo) => {
    const allValues = methods.getValues() as UserSubdomainInfo;
    const isChanged = methods.formState.dirtyFields.records;
    console.log(`isChanged  :${isChanged}`);
    // console.log(`data : ${JSON.stringify(allValues)}`);
    // NOTE: if not changed, do nothing return
    if (!isChanged) {
      setEditMode(false);
      return;
    }
    const { status, data } = await domainApi.query.editUserDomain({ userSubdomainInfo: formData });
    console.log(`status : ${status}`);
    if (status !== 200) {
      // failed to edit record
    }
    // if success reload all my domains
    if (status === 200) {
      setEditMode(false);
      await refetchQuery(['getMyDomain', 'my domains']);
    }
    return;
  };

  return (
    <FlexPaper sx={{ columnGap: 2, flexDirection: 'column', paddingY: 0.5, paddingX: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
          <FlexBox sx={{ paddingY: 1, justifyContent: 'space-between' }}>
            <Typography variant="h5">{fullDomain}</Typography>
          </FlexBox>
          <Divider flexItem />
          <FlexBox sx={{ columnGap: 1, flexDirection: 'column', rowGap: 1, paddingY: 1 }}>
            <SubdomainRecordHeader />

            <FlexBox sx={{ rowGap: 1, flexDirection: 'column' }}>
              {subdomainRecords.map((subdominRecord, idx) => (
                <SubdomainRecord
                  recordIdx={idx}
                  key={`subdominRecord-${idx}`}
                  editMode={isEditMode}
                />
              ))}
            </FlexBox>
            {isEditMode && (
              <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
                <Tooltip arrow placement="top" title="추가하기">
                  <span>
                    <IconButton onClick={onClickAddSubdomainRecord}>
                      <ControlPointOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip arrow placement="top" title="마인크래프트 SRV">
                  <span>
                    <IconButton onClick={onClickAddMinecraftSRV}>
                      <Image src={icon.minecraftIcon} sx={{ height: 30, width: 30 }} />
                    </IconButton>
                  </span>
                </Tooltip>
              </FlexBox>
            )}
          </FlexBox>
          <Divider flexItem />
          {isEditMode && (
            <FlexBox sx={{ paddingY: 1, justifyContent: 'end', columnGap: 1 }}>
              <Button variant="contained" color="info" type="submit">
                저장하기
              </Button>
              <Button variant="contained" color="error" onClick={onClickCancelEdit}>
                취소
              </Button>
            </FlexBox>
          )}
        </form>
      </FormProvider>
      {!isEditMode && (
        <FlexBox sx={{ paddingY: 1, justifyContent: 'end', columnGap: 1 }}>
          <>
            <Button variant="contained" color="info" onClick={onClickEditSubdomainRecord}>
              수정하기
            </Button>
            <Button variant="contained" color="error" onClick={() => {}}>
              삭제
            </Button>
          </>
        </FlexBox>
      )}
    </FlexPaper>
  );
}
