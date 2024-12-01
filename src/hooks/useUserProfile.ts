import { useCookies } from 'react-cookie';

type Profile = {
  nickname: string | undefined;
  profileImage: string | undefined;
};

type setProfile = {
  setNickname: (nickname: string, expires_at: Date) => void;
  setProfileImage: (profileImage: string, expires_at: Date) => void;
  removeUserProfile: () => void;
};

export default function useUserProfile(): [Profile, setProfile] {
  const [cookies, setCookie, removeCookie] = useCookies(['nickname', 'profileImage']);

  const setNickname = (nickname: string, expires_at: Date) => {
    setCookie('nickname', nickname, { expires: expires_at });
  };

  const setProfileImage = (profileImage: string, expires_at: Date) => {
    setCookie('profileImage', profileImage, { expires: expires_at });
  };

  const removeUserProfile = () => {
    removeCookie('nickname'), removeCookie('profileImage');
  };

  return [
    {
      nickname: cookies.nickname,
      profileImage: cookies.profileImage,
    },
    {
      setNickname,
      setProfileImage,
      removeUserProfile,
    },
  ];
}
