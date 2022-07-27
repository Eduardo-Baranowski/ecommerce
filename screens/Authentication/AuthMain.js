import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import { Shadow } from 'react-native-shadow-2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextButton, FormInput, IconButton } from '../../components';

import { icons, images, COLORS, FONTS, SIZES } from '../../constants';

const AuthMain = () => {
  const [mode, setMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const styles = StyleSheet.create({
    authContainer: {
      flex: 1,
      width: SIZES.width - SIZES.padding * 2,
      paddingHorizontal: SIZES.padding,
      paddingVertical: SIZES.radius,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.light,
    },
  });

  const animationState = useAnimationState({
    signIn: {
      height: SIZES.height * 0.55,
    },
    signUp: {
      height: SIZES.height * 0.7,
    },
  });

  useEffect(() => {
    animationState.transitionTo('signIn');
  }, [animationState]);

  function renderSignIn() {
    return (
      <MotiView
        state={animationState}
        style={{
          marginTop: SIZES.padding,
          height: SIZES.height * 0.55,
        }}
      >
        <Shadow>
          <View style={styles.authContainer}>
            <Text
              style={{
                width: '60%',
                lineHeight: 45,
                color: COLORS.dark,
                ...FONTS.h1,
              }}
            >
              Sin in to continue
            </Text>
            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeHolder="Email"
                value={email}
                onChange={text => setEmail(text)}
                prependComponent={
                  <Image
                    source={icons.email}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
              />

              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeHolder="Password"
                value={password}
                secureTextEntry={!isVisible}
                onChange={text => setPassword(text)}
                prependComponent={
                  <Image
                    source={icons.lock}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
                appendComponent={
                  <IconButton
                    icon={isVisible ? icons.eye_off : icons.eye}
                    iconStyle={{
                      tintColor: COLORS.grey,
                    }}
                    onPress={() => setIsVisible(!isVisible)}
                  />
                }
              />
            </KeyboardAwareScrollView>
          </View>
        </Shadow>
      </MotiView>
    );
  }

  function renderSignUp() {
    return (
      <MotiView
        state={animationState}
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Shadow>
          <View style={styles.authContainer} />
        </Shadow>
      </MotiView>
    );
  }

  function renderAuthcontainer() {
    if (mode === 'signIn') {
      return renderSignIn();
    }
    return renderSignUp();
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightGrey,
      }}
    >
      <Image
        source={images.logo}
        style={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
          width: 50,
          height: 50,
        }}
      />

      <View>{renderAuthcontainer()}</View>
      <TextButton
        label="Toggle"
        onPress={() => {
          if (animationState.current === 'signIn') {
            animationState.transitionTo('signUp');
            setMode('signUp');
          } else {
            animationState.transitionTo('signIn');
            setMode('signIn');
          }
        }}
      />
    </View>
  );
};

export default AuthMain;
