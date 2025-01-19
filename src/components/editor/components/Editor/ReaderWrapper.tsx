import { API, BlockMutationEvent } from '@editorjs/editorjs';

import type { OutputDataSchemaType } from '../../models';
import EditorBase from './base/EditorBase';
import type { onChangeEditorJS } from './types';

type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

interface IReaderWrapper<T> {
  data: T;
}

export default function ReaderWrapper<T extends OutputDataSchemaType>(props: IReaderWrapper<T>) {
  const { data } = props;

  const onChange: onChangeEditorJS = async (api: API, event: EditorJSOnChangeEvent) => {
    // const target_id = blockEvent.detail.target.id;
    // const isMultiBlockEvent = Array.isArray(event);
    // if (isMultiBlockEvent) event.map((event) => dispatchChangeEvent(api, event));
    // if (!isMultiBlockEvent) dispatchChangeEvent(api, event);
    // const content = await api.saver.save();
  };

  return <EditorBase onChange={onChange} data={data.data} readOnly />;
}
