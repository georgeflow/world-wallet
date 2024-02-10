import React, { useEffect, useState } from 'react';
import apiService from '../ApiService';

interface UserProfile {
  firstName: string;
  lastName: string;
}

const initialState: UserProfile = {
  firstName: '',
  lastName: '',
};

const Profile: React.FC = () => {
  const [state, setState] = useState<UserProfile>(initialState);

  const firstName = state.firstName || 'Missing';
  const lastName = state.lastName || 'No.';

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      if (userInfo) {
        const { firstName, lastName } = userInfo;
        setState((prevState) => ({
          ...prevState,
          firstName,
          lastName,
        }));
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile();
  }, []);


  return (
    <section>
      <h2>My Profile</h2>
      <h3>
        Welcome back, {firstName} {lastName}! Everything is fine.
      </h3>
    </section>
  );
};

export default Profile;