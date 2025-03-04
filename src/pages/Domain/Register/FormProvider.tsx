import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';

import { useNavigate } from '@tanstack/react-router';

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
  const navigate = useNavigate();

  const submit = async (formData: RegisterDomainInput) => {
    const allValues = methods.getValues();
    // console.log(`data : ${JSON.stringify(allValues)}`);
    const resp = await domainApi.query.registerNewDomain({ data: allValues });

    if (resp.status / 200 !== 2) {
      alert('');
      methods.reset();
    }
    if (resp.status / 200 === 2) {
      navigate({ to: '/me/domain', replace: true });
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
