import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { FlexBox } from '@/components/styled';

import api from '../api';
import type { RegisterDomainInput } from '../models';
import DomainOptionSettings from './DomainSettings';
import DomainRegisterFormProvider from './FormProvider';
import DomainSearchBar from './SearchBar';

export default function DomainRegister() {
  const {
    data: availableDomains,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['getAvailableDomains'],
    queryFn: api.queryFn.getAvailableDomains,
    staleTime: Infinity,
  });

  const defaultData: RegisterDomainInput = {
    domain: '',
    subdomain: '',
    // host: '',
    ip: '',
    // port: 25565,
  };

  if (isFetching) {
    return <CircularProgress />;
  }
  if (isSuccess && availableDomains) {
    const defaultData: RegisterDomainInput = {
      domain: availableDomains.domains[0],
      subdomain: '',
      ip: '',
      // port: 25565,
    };
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <DomainRegisterFormProvider data={defaultData}>
          <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}>
            <DomainSearchBar availableDomains={availableDomains.domains} />
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
}
