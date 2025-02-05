import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';

import domainApi from '@/api/domain';
import type { RegisterDomainInput } from '@/schema/domain';

interface PostFormProviderPropsIntf<T> {
  data?: DefaultValues<T>;
  children: React.ReactNode;
}

const defaultData: RegisterDomainInput = {
  domain: '',
  subdomain: '',
  // host: '',
  ip: '',
  // port: 25565,
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
    // console.log(`data : ${JSON.stringify(allValues)}`);
    await domainApi.query.registerNewDomain({ data: allValues });
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
