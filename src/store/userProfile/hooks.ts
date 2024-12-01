import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUserProfile, setUserNickname, setUserProfileImage } from './userProfile';

const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const { nickname, profileImage } = useAppSelector(selectUserProfile);
  const setNickname = (nickname: string) => dispatch(setUserNickname(nickname));
  const setProfileImage = (profileImage: string) => dispatch(setUserProfileImage(profileImage));
  return [
    { nickname, profileImage },
    { setNickname, setProfileImage },
  ];
};

function readUserProfile(): { nickname: string | undefined; profileImage: string | undefined } {
  const { nickname, profileImage } = useAppSelector(selectUserProfile);

  return { nickname, profileImage };
}

export { useUserProfile, readUserProfile };
