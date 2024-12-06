import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import useUserProfile from '@/hooks/useUserProfile';

import api from './api';

interface PostFormProviderPropsIntf<T> {
  data: DefaultValues<T>;
  children: React.ReactNode;
}

export default function PostFormProvider<T extends FieldValues>(
  props: PostFormProviderPropsIntf<T>,
) {
  const { data, children } = props;
  const methods = useForm<T>({
    defaultValues: data,
  });

  const [userProfile] = useUserProfile();
  const postID = methods.getValues('id' as FieldPath<T>);
  const isEditMode = !!postID;
  // console.log(`methods.getValues('id') : ${methods.getValues('id')}`);

  const submit = async () => {
    const allValues = methods.getValues();
    console.log(`data : ${JSON.stringify(allValues)}`);
    if (isEditMode) {
      await api.query.editBoardPost();
      // await editBoardPost({ token: auth.id_token, data: allValues, postID: postID });
    }
    if (!isEditMode) {
      // await createBoardPost2<T>({ token: auth.id_token, data: allValues });
      //   await AddNewTrack({ track: data });
    }
    return;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
        {children}
      </form>
    </FormProvider>
  );
}
