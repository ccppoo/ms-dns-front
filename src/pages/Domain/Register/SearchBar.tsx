import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { z } from 'zod';

import { FlexBox, FlexPaper } from '@/components/styled';

import api from '../api';
import type { RegisterDomain } from '../models';

const searchBarForm = z.object({
  value: z.string(),
});

type SearchBarForm = z.infer<typeof searchBarForm>;

function SelectDomainHost({ availableDomains }: { availableDomains: string[] }) {
  const methods = useFormContext<RegisterDomain>();

  const handleChange = (event: SelectChangeEvent) => {
    // setDomainHost(event.target.value);
    // setDomainHost(event.target.value);
    methods.setValue('domain', event.target.value);
  };

  const domain = methods.watch('domain');

  return (
    <Select<string>
      labelId="demo-simple-select-autowidth-label"
      id="demo-simple-select-autowidth"
      value={domain}
      onChange={handleChange}
      // defaultValue={availableDomains[0]}
      label="host"
      size="small"
    >
      {availableDomains.map((domain, idx) => (
        <MenuItem value={domain} key={`select-domain-${domain}`}>
          {domain}
        </MenuItem>
      ))}
    </Select>
  );
}

type DomainStatus = {
  used: number;
  allowed: number;
  host: string;
  subdomain: string;
};

type DomainAvailableAsk = DomainStatus & {
  msg: string;
};
export default function DomainSearchBar({ availableDomains }: { availableDomains: string[] }) {
  const methods = useFormContext<RegisterDomain>();

  const formPathSubdomain = 'subdomain' as FieldPath<RegisterDomain>;

  const domain = methods.watch('domain');

  const [domainCheckLoading, setDomainCheckLoading] = useState<boolean>(false);
  const [domainCheckStatus, setDomainCheckStatus] = useState<DomainAvailableAsk>({
    msg: '',
    used: 0,
    allowed: 0,
    host: '',
    subdomain: '',
  });
  const checkSubDomainAvailable = async () => {
    setDomainCheckLoading(true);
    const data = await api.query.checkDomainAvailable({
      domain: methods.getValues('domain'),
      subdomain: methods.getValues(formPathSubdomain) as string,
    });
    setDomainCheckStatus(data);

    setDomainCheckLoading(false);
  };

  const subDomain = methods.watch(formPathSubdomain);

  return (
    <FlexBox
      sx={{
        flexDirection: 'column',
        rowGap: 2,
      }}
    >
      <Typography>도메인 등록</Typography>
      <FlexBox
        sx={{
          height: 250,
          backgroundColor: '#c9f598',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: 2,
        }}
      >
        <FlexPaper
          sx={{
            padding: 1,
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
            rowGap: 1,
          }}
        >
          <FlexBox
            sx={{
              height: 50,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            도메인 검색
          </FlexBox>
          <FlexBox sx={{ width: '70%', columnGap: 1, justifyContent: 'center' }}>
            <TextField
              id="domain-search-textfield"
              placeholder="search domain"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                },
                htmlInput: methods.register(formPathSubdomain, {
                  required: 'search',
                }),
              }}
              variant="outlined"
              size="small"
              // fullWidth

              onKeyDown={(ev) => {
                // console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === 'Enter') {
                  // Do code here
                  ev.preventDefault();
                }
              }}
            />
            <SelectDomainHost availableDomains={availableDomains} />
          </FlexBox>
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography variant="h6">
              {subDomain}.{domain}
            </Typography>
            <LoadingButton
              size="small"
              onClick={checkSubDomainAvailable}
              loading={domainCheckLoading}
              loadingIndicator="Loading…"
              variant="contained"
            >
              중복 확인
            </LoadingButton>
          </FlexBox>
          <FlexBox
            sx={{
              height: 50,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: domainCheckStatus.allowed ? '#25c428' : '#e32110',
              }}
            >
              {domainCheckStatus.msg}
            </Typography>
          </FlexBox>
        </FlexPaper>
      </FlexBox>
    </FlexBox>
  );
}
