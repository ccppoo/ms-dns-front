import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import useUserProfile from '@/hooks/useUserProfile';

import api from '../api';
import type { RegisterDomainInput } from '../models';

interface PostFormProviderPropsIntf<T> {
  data?: DefaultValues<T>;
  children: React.ReactNode;
}

const defaultData: RegisterDomainInput = {
  domain: '',
  subdomain: '',
  // host: '',
  ip: '',
  port: 25565,
};

// export default function DomainRegisterFormProvider<T extends FieldValues>(
export default function DomainRegisterFormProvider(
  props: PostFormProviderPropsIntf<RegisterDomainInput>,
) {
  const { data, children } = props;
  const methods = useForm<RegisterDomainInput>({
    defaultValues: data || defaultData,
  });

  const submit = async (formData: RegisterDomainInput) => {
    const allValues = methods.getValues();
    console.log(`data : ${JSON.stringify(allValues)}`);
    await api.query.registerNewDomain({ data: allValues });
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
