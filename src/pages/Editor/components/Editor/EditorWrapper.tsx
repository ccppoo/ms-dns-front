import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FieldArrayPath, FieldPath, PathValue } from 'react-hook-form';

import { Box, Button, Paper } from '@mui/material';

import { API, BlockMutationEvent } from '@editorjs/editorjs';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import { outputSchema } from '../../models';
import type { OutputBlockDataType, OutputDataSchemaType, OutputSchemaType } from '../../models';
import boardImageAPI from './api';
import EditorBase from './base/EditorBase';
import dispatchChangeEvent from './config/eventHandlers';
import type { onChangeEditorJS } from './types';

type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

interface EditorContainerIntf {
  readOnly?: boolean;
}

const API_IMAGE_UPLOAD_HOST = 'https://example.com';

export default function EditorWrapper<T extends OutputDataSchemaType>(props: EditorContainerIntf) {
  const { readOnly } = props;
  const [userProfile] = useUserProfile();
  const { setValue, getValues, control } = useFormContext<T>();
  type FormDataType = PathValue<T, FieldPath<T>>;
  const outputDataFormPath = 'data' as FieldPath<T>; // 글 쓴 내용 저장되는 form-path

  const data = getValues(outputDataFormPath);

  const saveOnChange = (value: FormDataType) => {
    setValue(outputDataFormPath, value);
  };

  const onChange: onChangeEditorJS = async (api: API, event: EditorJSOnChangeEvent) => {
    // const target_id = blockEvent.detail.target.id;
    const isMultiBlockEvent = Array.isArray(event);
    if (isMultiBlockEvent) event.map((event) => dispatchChangeEvent(api, event));
    if (!isMultiBlockEvent) dispatchChangeEvent(api, event);
    const content = await api.saver.save();
    saveOnChange(content as FormDataType);
  };

  const imageUploader = useMemo(
    () => boardImageAPI.getBoardCreate.imageUploader(userProfile.uid!),
    [userProfile.uid!],
  );

  return (
    <EditorBase
      onChange={onChange}
      data={data}
      imageUploader={imageUploader}
      readOnly={!!readOnly}
    />
  );
}
