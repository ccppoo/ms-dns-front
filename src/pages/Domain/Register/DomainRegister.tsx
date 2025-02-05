import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useLocalStorage } from '@uidotdev/usehooks';

import { FlexBox } from '@/components/styled';
import type { RegisterDomainInput } from '@/schema/domain';

import DomainOptionSettings from './DomainSettings';
import DomainRegisterFormProvider from './FormProvider';
import DomainSearchBar from './SearchBar';

// NOTE: 원래는 다른 host도 여러개 사용 가능하게 하려고 했으나, 일단은 하나로
export default function DomainRegister() {
  const availableDomains = ['mc-server.kr'];
  const [registerDomain, setRegisterDomain] = useLocalStorage<string | null>(
    'domainRegisterDomain',
    null,
  );
  const [registerSubdomain, setRegisterSubdomain] = useLocalStorage<string | null>(
    'domainRegisterSubdomain',
    null,
  );

  const defaultData: RegisterDomainInput = {
    domain: registerDomain || 'mc-server.kr',
    subdomain: registerSubdomain || '',
    ip: '',
    // port: 25565,
  };
  // const [_registerDomain, _setRegisterDomain] = useState<string | null>();
  // const [_registerSubdomain, _setRegisterSubdomain] = useState<string | null>();

  useEffect(() => {
    if (registerDomain) {
      setRegisterDomain(null);
    }
    if (registerSubdomain) {
      setRegisterSubdomain(null);
    }
  }, [registerDomain, setRegisterDomain, registerSubdomain, setRegisterSubdomain]);

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <DomainRegisterFormProvider data={defaultData}>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}>
          <DomainSearchBar availableDomains={availableDomains} />
          <DomainOptionSettings />
        </FlexBox>
        <FlexBox
          sx={{
            width: '100%',
            // border: '1px black solid',
            justifyContent: 'end',
            // padding: 2,
            // maxWidth: MAX_WIDTH,
          }}
        >
          <Button variant="contained" type="submit">
            submit
          </Button>
        </FlexBox>
      </DomainRegisterFormProvider>
    </Container>
  );
}
