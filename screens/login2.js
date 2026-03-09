import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

//API client
import axios from 'axios';

const login2 = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlelogin =(Credentials) =>{
    
  }

  // ✅ Email validation function
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleLogin = () => {
    let valid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (valid) {
      navigation.navigate('Signup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.title}>
        Welcome to <Image source={require('../assets/Images/small_logo.png')} style={styles.logo} />
      </Text>

      <Text style={styles.subtitle}>Sign in to your account</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={[styles.input, emailError && styles.errorInput]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[styles.input, passwordError && styles.errorInput]}
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity

       style={styles.forgot}
       onPress={() => navigation.navigate('forgot_password')}>
       <Text style={styles.forgot}>Forgot password?</Text>
        
      </TouchableOpacity>

      {/* Buttons */}
      <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
        <Text style={styles.primaryText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.googleText}>
          <View style={styles.google_Icon}>
          <Image source={require('../assets/Images/google_icon.png')} style={styles.googleIcon} />
          </View>
          {" "}Continue with Google</Text>
      </TouchableOpacity>

      {/* Bottom */}
      <TouchableOpacity style={styles.Register_button} onPress={() => navigation.navigate('Signup')}>
      <View style={styles.bottom}>
        <Text>Don’t have an account?</Text>
        <Text style={styles.register}>Register</Text>
      </View>
     </TouchableOpacity>
    </SafeAreaView>
  );
};

export default login2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
   googleIcon:{
     width: 30,
    height: 30,
    bottom: -8,
    
   },

  back: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    
  },

  logo: {
    height: 25,
    width: 30,
    
  },

  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  errorInput: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    marginBottom: 12,
    fontSize: 13,
  },

  forgot: {
    color: '#6C4CF1',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },

  primaryBtn: {
    backgroundColor: '#6C4CF1',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },

  primaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  googleBtn: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    
  },

  googleText: {
    fontSize: 18,
    fontWeight: '600',
    
  },

  bottom: {
    position: 'absolute',
    bottom: -535,
    width: '120%',
    padding: 24,
    backgroundColor: '#EFEAFF',
    left: -35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
  },

  register: {
    color: '#6C4CF1',
    fontWeight: '600',
  },
  Register_button: {
    bottom: 100
  }
});
