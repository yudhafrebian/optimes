import ProfileView from '@/components/view/pages/ProfileView';
import * as React from 'react';

interface IProfileProps {
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <>
        <ProfileView />
    </>
  )
};

export default Profile;
