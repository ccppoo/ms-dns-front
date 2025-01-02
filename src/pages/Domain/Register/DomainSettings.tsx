import { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import { FlexBox, FlexPaper, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

import type { RegisterDomain } from '../models';

interface FormInputRow<T extends FieldValues> {
  name: string;
  // helperText?: string;
  formPath: FieldPath<T>;
}

function FormInputRow<T extends FieldValues>(props: FormInputRow<T>) {
  const methods = useFormContext<T>();

  // const value = methods.watch(props.formPath);

  return (
    <FlexBox
      sx={{ columnGap: 1, width: '80%', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <FlexBox sx={{}}>
        <Typography>{props.name}</Typography>
      </FlexBox>
      <FlexBox sx={{}}>
        <TextField
          label=""
          slotProps={{
            htmlInput: methods.register(props.formPath, {
              required: '',
            }),
          }}
          placeholder="1.1.1.1"
          error={!!methods.formState.errors[props.formPath]}
          // helperText={props.helperText}
          size="small"
          variant="outlined"
        />
      </FlexBox>
    </FlexBox>
  );
}

export default function DomainOptionSettings() {
  const { getValues, setValue, formState, register } = useFormContext<RegisterDomain>();
  const formPathIP = 'ip' as FieldPath<RegisterDomain>;
  // const formPathPort = 'port' as FieldPath<RegisterDomain>;
  type FormDataType = PathValue<RegisterDomain, FieldPath<RegisterDomain>>;

  return (
    <FlexBox
      sx={{
        flexDirection: 'column',
        rowGap: 2,
      }}
    >
      <Typography>도메인 설정</Typography>
      <FlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: '#c9f598',
          height: 300,
        }}
      >
        <FlexPaper
          sx={{
            flexDirection: 'column',
            width: '80%',

            padding: 1,
            alignItems: 'center',
            rowGap: 1,
          }}
        >
          <FormInputRow formPath={formPathIP} name="IP 주소" />
          {/* <FormInputRow formPath={formPathPort} name="마인크래프트 접속 포트 번호" /> */}
        </FlexPaper>
      </FlexBox>
    </FlexBox>
  );
}
