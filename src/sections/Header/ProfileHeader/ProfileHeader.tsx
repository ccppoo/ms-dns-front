import { styled } from '@mui/material/styles';

import { Link as RouterLink } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import LogginButton from './LoginButton';
import UserProfile from './UserProfile';

export const RouterLinkWrapper = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

export default function ProfileHeader() {
  const [userProfile] = useUserProfile();

  const profileLoaded = !!userProfile.nickname;

  return <FlexBox>{profileLoaded ? <UserProfile /> : <LogginButton />}</FlexBox>;
}
