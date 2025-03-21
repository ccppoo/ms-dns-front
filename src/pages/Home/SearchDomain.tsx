import { ChangeEvent, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useNavigate } from '@tanstack/react-router';

import { FlexBox, FlexPaper } from '@/components/styled';

export default function SearchDomain() {
  const navigate = useNavigate();

  const [searchDomain, setSearchDomain] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDomain(event.target.value);
  };

  const domain = 'mc-server.kr';
  const gotoSearchDomain = () => {
    if (!searchDomain.length) return;

    navigate({
      to: `/domain/search?domain=${domain}&subdomain=${searchDomain}`,
    });
  };

  return (
    <FlexPaper
      sx={{
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}
    >
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography>IP 주소 대신 도메인 쓰자!</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '70%', columnGap: 0.5 }}>
        <TextField
          id="domain-search-textfield"
          placeholder="my-server"
          slotProps={{
            input: {
              // startAdornment: (
              //   <InputAdornment position="start">
              //     <SearchOutlinedIcon />
              //   </InputAdornment>
              // ),
              endAdornment: <InputAdornment position="end">.mc-server.kr</InputAdornment>,
            },
          }}
          variant="outlined"
          size="small"
          fullWidth
          value={searchDomain}
          onChange={onInputChange}
          onKeyDown={(ev) => {
            // console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === 'Enter') {
              ev.preventDefault();
              gotoSearchDomain();
            }
          }}
        />
        <IconButton
          sx={{ borderRadius: 1, backgroundColor: '#99ccff' }}
          disabled={!searchDomain.length}
          onClick={gotoSearchDomain}
        >
          <SendIcon />
        </IconButton>
      </FlexBox>
    </FlexPaper>
  );
}
