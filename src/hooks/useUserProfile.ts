import { useCookies } from 'react-cookie';

type Profile = {
  nickname: string | undefined;
  profileImage: string | undefined;
  uid: string | undefined;
};

type ProfileActions = {
  setNickname: (nickname: string, expires_at: Date) => void;
  setProfileImage: (profileImage: string, expires_at: Date) => void;
  setUID: (uid: string, expires_at: Date) => void;
  removeUserProfile: () => void;
};

export default function useUserProfile(): [Profile, ProfileActions] {
  const [cookies, setCookie, removeCookie] = useCookies(['nickname', 'profileImage', 'uid']);

  const setNickname = (nickname: string, expires_at: Date) => {
    setCookie('nickname', nickname, { expires: expires_at });
  };

  const setProfileImage = (profileImage: string, expires_at: Date) => {
    setCookie('profileImage', profileImage, { expires: expires_at });
  };

  const setUID = (uid: string, expires_at: Date) => {
    setCookie('uid', uid, { expires: expires_at });
  };

  const removeUserProfile = () => {
    removeCookie('nickname'), removeCookie('profileImage');
    removeCookie('uid');
  };

  return [
    {
      nickname: cookies.nickname,
      profileImage: cookies.profileImage,
      uid: cookies.uid,
    },
    {
      setNickname,
      setProfileImage,
      setUID,
      removeUserProfile,
    },
  ];
}
