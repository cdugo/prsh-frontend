import React, { useState } from 'react';
import { View, Button, Text, Image } from 'react-native';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import { signInWithApple, getBeastProfile, updateBeastProfile } from '../api/apiService';
import { Beast } from '../types';

const AuthScreen = () => {
  const [user, setUser] = useState<Beast | null>(null);
  const [error, setError] = useState('');

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken } = appleAuthRequestResponse;

        if (identityToken) {
            const response = await signInWithApple(identityToken);
            setUser(response.beast);
        }
    }
    } catch (error) {
        console.log(error);
      setError('Sign in failed. Please try again.');
    }
  };

  const fetchProfile = async () => {
    if (user) {
      try {
        const profile = await getBeastProfile(user.id);
      } catch (error) {
        setError('Failed to fetch profile');
      }
    }
  };

  const updateProfile = async () => {
    if (user) {
      try {
        const updatedProfile = await updateBeastProfile(user.id, { gamerTag: 'UpdatedTag' });
      } catch (error) {
        setError('Failed to update profile');
      }
    }
  };

  return (
    <View style={{ flex:2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color:"white", fontSize: 24, fontWeight: 'bold' }}>{`${user ? `Preeesh, ${user.gamerTag}!` : 'Welcome'}`}</Text>
          {!user && <AppleButton
        buttonStyle={AppleButton.Style.DEFAULT}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
    }
      {user && (
        <>
        <Image source={require('../../assets/griddy.gif')} />

          <Button title="Fetch Profile" onPress={fetchProfile} />
          <Button title="Update Profile" onPress={updateProfile} />
        </>
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default AuthScreen;