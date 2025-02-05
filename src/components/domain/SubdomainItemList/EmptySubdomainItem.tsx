import { Paper, Typography } from '@mui/material';

import { Link } from '@tanstack/react-router';

export default function EmptySubdomainItem() {
  const message = '새로운 도메인을 등록할 수 있습니다!';

  return (
    <Paper
      component={Link}
      sx={{
        paddingY: 1,
        paddingX: 2,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#d7d9d7',
        display: 'flex',
      }}
      to={'/domain/register'}
      style={{ color: 'black', textDecoration: 'none' }}
    >
      <Typography>{message}</Typography>
    </Paper>
  );
}
