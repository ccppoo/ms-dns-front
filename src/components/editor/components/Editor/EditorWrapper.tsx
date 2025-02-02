import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { API, BlockMutationEvent } from '@editorjs/editorjs';

import { uploadImage } from '@/api/image/postImageUpload';
import useUserProfile from '@/hooks/useUserProfile';

import type { OutputDataSchemaType } from '../../models';
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
  const methods = useFormContext<T>();
  type FormDataType = PathValue<T, FieldPath<T>>;
  const outputDataFormPath = 'data' as FieldPath<T>; // 글 쓴 내용 저장되는 form-path

  const data = methods.getValues(outputDataFormPath);
  console.log(`data : ${JSON.stringify(data)}`);
  // console.log(`getValues : ${JSON.stringify(getValues(outputDataFormPath))}`);

  const saveOnChange = (value: FormDataType) => {
    methods.setValue(outputDataFormPath, value);
  };

  const onChange: onChangeEditorJS = async (api: API, event: EditorJSOnChangeEvent) => {
    // const target_id = blockEvent.detail.target.id;
    const isMultiBlockEvent = Array.isArray(event);
    if (isMultiBlockEvent) event.map((event) => dispatchChangeEvent(api, event));
    if (!isMultiBlockEvent) dispatchChangeEvent(api, event);
    const content = await api.saver.save();
    saveOnChange(content as FormDataType);
  };

  // const imageUploader = useMemo(
  //   () => boardImageAPI.getBoardCreate.imageUploader(userProfile.uid!),
  //   [userProfile.uid!],
  // );

  return (
    <EditorBase onChange={onChange} data={data} imageUploader={uploadImage} readOnly={!!readOnly} />
  );
}
