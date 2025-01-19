import { ChangeEvent, useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';

import { useQuery } from '@tanstack/react-query';

import { FlexBox } from '@/components/styled';

import api from './api';

export default function SearchDomain() {
  const {
    data: availableDomains,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['getAvailableDomains'],
    queryFn: api.queryFn.getAvailableDomains,
    staleTime: Infinity,
  });

  const [searchDomain, setSearchDomain] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDomain(event.target.value);
  };

  if (isSuccess && availableDomains) {
    return (
      <FlexBox
        sx={{
          height: 200,
          backgroundColor: 'greenyellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}>
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
                endAdornment: <InputAdornment position="end">mc-server.kr</InputAdornment>,
              },
            }}
            variant="outlined"
            size="small"
            // fullWidth
            value={searchDomain}
            onChange={onInputChange}
            onKeyDown={(ev) => {
              // console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === 'Enter') {
                ev.preventDefault();
              }
            }}
          />
        </FlexBox>
      </FlexBox>
    );
  }
}
