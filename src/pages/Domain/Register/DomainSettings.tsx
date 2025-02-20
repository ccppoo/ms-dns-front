import { useFormContext } from 'react-hook-form';
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form';

import { TextField, Typography } from '@mui/material';

import { FlexBox, FlexPaper } from '@/components/styled';
import type { RegisterDomain } from '@/schema/domain';

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
  const formPathIP = 'ip' as FieldPath<RegisterDomain>;

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
        </FlexPaper>
      </FlexBox>
    </FlexBox>
  );
}
