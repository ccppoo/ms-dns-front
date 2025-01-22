import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Button, Divider, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import { useQuery } from '@tanstack/react-query';

import { refetchQuery } from '@/api';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import api from '@/pages/Me/api';
import type {
  UserDomain,
  UserDomains,
  UserSubdomainInfo,
  UserSubdomainRecord,
  UserSubdomains,
} from '@/pages/Me/models';
import { icon } from '@/static';

import apiii from '../api';

function DNSRecordValues({ values }: { values: string[] }) {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {values.map((value, idx) => (
        <Typography key={idx}>{value}</Typography>
      ))}
    </FlexBox>
  );
}

function DomainItem({ userDomain }: { userDomain: UserDomain }) {
  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox>{userDomain.recordType}</FlexBox>
      <FlexBox sx={{ columnGap: 1 }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>Name</FlexBox>

          <FlexBox>{userDomain.name}</FlexBox>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>Values</FlexBox>
          <DNSRecordValues values={userDomain.values} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function SubdomainRecordValue({ value }: { value: string }) {
  return (
    <FlexBox>
      <Typography>{value}</Typography>
    </FlexBox>
  );
}

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

function SubdomainRecordReadMode({ recordIdx }: { recordIdx: number }) {
  const methods = useFormContext<UserSubdomainInfo>();

  const recordValues = methods.getValues(`records.${recordIdx}`);

  return (
    <FlexBox sx={{ columnGap: 2, alignItems: 'center' }}>
      <FlexBox sx={{ flex: '1 1 15%', justifyContent: 'center' }}>
        <FlexBox sx={{ border: '1px solid black', borderRadius: 2, paddingX: 1 }}>
          <Typography variant="h6">{recordValues.recordType}</Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox sx={{ flex: '1 1 40%', justifyContent: 'center' }}>
        <Typography>{recordValues.name}</Typography>
      </FlexBox>
      <FlexBox sx={{ flex: '1 1 45%', justifyContent: 'center' }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          {recordValues.values.map((recordValue, idx) => (
            <SubdomainRecordValue value={recordValue} key={`recordValue-${recordValue}`} />
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function SubdomainRecordValueEditMode({
  recordIdx,
  recordValueIdx,
}: {
  recordIdx: number;
  recordValueIdx: number;
}) {
  const methods = useFormContext<UserSubdomainInfo>();

  const { domain, subdomain } = methods.getValues();
  const fullDomain = `${subdomain}.${domain}`;

  const recordValue = methods.watch(`records.${recordIdx}.values.${recordValueIdx}`);

  const valueEditDisabled = false;

  const recordValueError =
    methods.formState.errors.records &&
    methods.formState.errors.records[recordIdx] &&
    methods.formState.errors.records[recordIdx].values &&
    methods.formState.errors.records[recordIdx].values[recordValueIdx];

  const validateRecordValue = () => {
    const recordValue = methods.getValues(
      `records.${recordIdx}.values.${recordValueIdx}`,
    ) as string;

    const isEmpty = recordValue.trim().length < 1;
    if (isEmpty) {
      methods.setError(
        `records.${recordIdx}.values.${recordValueIdx}`,
        {
          message: `값이 비어 있으면 안됩니다.`,
        },
        { shouldFocus: true },
      );
      return;
    }
    if (!isEmpty) {
      methods.clearErrors(`records.${recordIdx}.values.${recordValueIdx}`);
    }
  };

  return (
    <TextField
      // id={`textfield-record-${recordIdx}-value-${recordValueIdx}`}
      {...methods.register(`records.${recordIdx}.values.${recordValueIdx}`, {
        required: true,
        onBlur: (e) => validateRecordValue(),
      })}
      disabled={valueEditDisabled}
      error={!!recordValueError}
      helperText={recordValueError?.message}
      size="small"
      fullWidth
    />
  );
}

function SubdomainRecordEditMode({ recordIdx }: { recordIdx: number }) {
  const methods = useFormContext<UserSubdomainInfo>();
  const { domain, subdomain } = methods.getValues();
  const fullDomain = `${subdomain}.${domain}`;
  const recordValues = methods.watch(`records.${recordIdx}`);

  const handleRecordTypeChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    methods.setValue(`records.${recordIdx}.recordType`, event.target.value as string);
  };

  const allowedRecordType: string[] = ['A', 'SRV', 'TXT'];

  const editNotAllowed = recordValues.recordType == 'A';
  const deleteNotAllowed = recordValues.recordType == 'A';

  const recordNameError =
    methods.formState.errors.records &&
    methods.formState.errors.records[recordIdx] &&
    methods.formState.errors.records[recordIdx].name;

  const onClickRecordDelete = () => {
    const records = methods.getValues(`records`);
    const removedRecords = records
      .map((record, idx) => {
        if (idx != recordIdx) {
          return record;
        }
      })
      .filter((x) => x != undefined);
    methods.setValue(`records`, removedRecords);
  };

  const validateRecordName = () => {
    const recordName = methods.getValues(`records.${recordIdx}.name`);
    // console.log(`fullDomain : ${fullDomain}`);
    const regex = new RegExp('^.*' + fullDomain + '$', 'g');
    const regextest = regex.test(recordName);
    // console.log(`regextest : ${regextest}`);
    if (!regextest) {
      methods.setError(
        `records.${recordIdx}.name`,
        {
          message: `자신이 소유하고 있는 도메인으로 끝나야합니다. ${fullDomain}`,
        },
        { shouldFocus: true },
      );
      return;
    }
    if (regextest) {
      methods.clearErrors(`records.${recordIdx}.name`);
    }
  };

  return (
    <FlexBox sx={{ columnGap: 2, alignItems: 'center' }}>
      <FlexBox sx={{ width: '100%' }}>
        <FlexBox sx={{ flex: '1 1 15%', justifyContent: 'center' }}>
          <FlexBox sx={{}}>
            <Select
              value={recordValues.recordType}
              size="small"
              disabled={editNotAllowed}
              onChange={handleRecordTypeChange}
            >
              {allowedRecordType.map((recordType, idx) => (
                <MenuItem
                  value={recordType}
                  key={`select-${recordType}`}
                  disabled={recordType == 'A'}
                >
                  {recordType}
                </MenuItem>
              ))}
            </Select>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ flex: '1 1 40%', justifyContent: 'center', paddingX: 0.5 }}>
          <TextField
            {...methods.register(`records.${recordIdx}.name`, {
              required: true,
              onBlur: (e) => validateRecordName(),
            })}
            error={!!recordNameError}
            helperText={recordNameError?.message}
            disabled={editNotAllowed}
            size="small"
            fullWidth
          />
        </FlexBox>
        <FlexBox sx={{ flex: '1 1 45%', justifyContent: 'center' }}>
          <FlexBox sx={{ flexDirection: 'column', width: '100%', paddingX: 0.5 }}>
            {recordValues.values.map((recordValue, idx) => (
              <SubdomainRecordValueEditMode
                recordIdx={recordIdx}
                recordValueIdx={idx}
                key={`recordValue-${idx}`}
              />
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox>
        <Tooltip arrow placement="top" title="삭제하기">
          <span>
            <IconButton onClick={onClickRecordDelete} disabled={deleteNotAllowed}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </FlexBox>
    </FlexBox>
  );
}

function SubdomainRecord({ recordIdx, editMode }: { recordIdx: number; editMode: boolean }) {
  if (editMode) {
    return <SubdomainRecordEditMode recordIdx={recordIdx} />;
  }
  return <SubdomainRecordReadMode recordIdx={recordIdx} />;
}

function SubdomainItem({ userSubdomain }: { userSubdomain: UserSubdomainInfo }) {
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
  };
  // a = {
  //   name: 'test2',
  //   note: '',
  //   subdomain: 'test2',
  //   domain: 'mc-server.kr',
  //   records: [{ recordType: 'A', name: 'test2.mc-server.kr', values: ['221.147.114.254'] }],
  //   createdAt: '2024-12-30T06:19:18+00:00',
  //   updatedAt: '2024-12-30T06:19:18+00:00',
  // };
  const submit = async (formData: UserSubdomainInfo) => {
    const allValues = methods.getValues() as UserSubdomainInfo;
    const isChanged = methods.formState.isDirty;
    console.log(`isChanged  :${isChanged}`);
    console.log(`data : ${JSON.stringify(allValues)}`);
    // NOTE: if not changed, do nothing return
    // if (!isChanged) {
    //   setEditMode(false);
    //   return;
    // }
    const { status, data } = await api.query.editMyDomain({ userSubdomainInfo: formData });
    console.log(`status : ${status}`);
    if (status != 200) {
      // failed to edit record
    }
    // if success reload all my domains
    if (status == 200) {
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

export default function MyDomain() {
  const [userProfile] = useUserProfile();

  const { data, isSuccess } = useQuery({
    queryKey: ['getMyDomain', 'my domains'],
    queryFn: apiii.queryFn.getMyDomains,
    enabled: !!userProfile.uid,
  });

  // console.log(`data : ${JSON.stringify(data)}`);

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>
            <Typography variant="h4">내 도메인</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {isSuccess && (
        <FlexBox sx={{ rowGap: 2, flexDirection: 'column' }}>
          {data?.subdomains.map((userSubdomain) => (
            <SubdomainItem
              userSubdomain={userSubdomain}
              key={`user-sub-domain-${userSubdomain.name}`}
            />
          ))}
        </FlexBox>
      )}
    </Container>
  );
}
