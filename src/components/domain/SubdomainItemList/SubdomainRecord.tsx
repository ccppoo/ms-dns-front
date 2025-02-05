import { useFormContext } from 'react-hook-form';

import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import type { UserSubdomainInfo } from '@/schema/domain';

function SubdomainRecordValue({ value }: { value: string }) {
  return (
    <FlexBox>
      <Typography>{value}</Typography>
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
export default function SubdomainRecord({
  recordIdx,
  editMode,
}: {
  recordIdx: number;
  editMode: boolean;
}) {
  if (editMode) {
    return <SubdomainRecordEditMode recordIdx={recordIdx} />;
  }
  return <SubdomainRecordReadMode recordIdx={recordIdx} />;
}
