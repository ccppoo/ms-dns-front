import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { BoardPostTitle } from '@/schema/post';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

interface TitleIntf {
  readOnly: boolean;
}

export default function Title<T extends BoardPostTitle>(props: TitleIntf) {
  const { readOnly } = props;
  const { getValues, setValue, formState, register } = useFormContext<T>();

  const formPath = 'title' as FieldPath<T>;
  type FormDataType = PathValue<T, FieldPath<T>>;

  const helperText = formState.errors.title?.message ? 'Please input creator username' : undefined;

  // console.log(`getValues : ${JSON.stringify(getValues())}`);
  const titleValue = getValues(formPath);
  const setTitleValue = (value: string) => setValue(formPath, value as FormDataType);

  if (!readOnly) {
    return (
      <TextField
        fullWidth
        label=""
        slotProps={{
          htmlInput: register(formPath, {
            required: '제목을 입력하세요',
          }),
        }}
        // {...register(formPath, {
        //   required: '제목을 입력하세요',
        // })}
        placeholder="제목을 입력하세요"
        error={!!formState.errors.title}
        helperText={helperText}
        // size="small"
        variant="outlined"
      />
    );
  }

  return <Typography>{titleValue}</Typography>;
}
