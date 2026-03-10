import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { API } from '../services/api';

const Signup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // SIGNUP VALIDATION + API CALL
  const handleSignup = async () => {
    let tempErrors = {};
    let valid = true;

    if (!fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
      valid = false;
    }

    if (!mobile.trim()) {
      tempErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (mobile.length !== 10) {
      tempErrors.mobile = 'Mobile must be 10 digits';
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Enter valid email';
      valid = false;
    }

    if (password.length < 6) {
      tempErrors.password = 'Password must be 6+ characters';
      valid = false;
    }

    setErrors(tempErrors);
    if (!valid) return;

    try {
      setLoading(true);
      const response = await API.post('/register', {
        name: fullName,
        email,
        password,
        mobile,          // include mobile if backend accepts it; remove if it causes a 400
        deviceInfo: 'Expo Mobile',
      });
      console.log('Signup success:', response.data);
      setShowSuccess(true); // show success modal
    } catch (error) {
      // Log full error so you can see the real cause in Metro / terminal
      console.log('Signup error status:', error?.response?.status);
      console.log('Signup error data:', JSON.stringify(error?.response?.data));
      console.log('Signup error message:', error?.message);
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Signup failed. Please try again.';
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up!</Text>
        <Text style={styles.subtitle}>Create new account</Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your name"
        />
        {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

        <Text style={styles.label}>Mobile number</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={10}
          placeholder="Your mobile number"
        />
        {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="Email"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            secureTextEntry={!showPassword}
            style={{ flex: 1 }}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        {/* GENERAL ERROR */}
        {errors.general && <Text style={styles.error}>{errors.general}</Text>}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity onPress={handleSignup} disabled={loading}>
          <LinearGradient
            colors={loading ? ['#aaa', '#aaa'] : ['#6C63FF', '#7A5CFF', '#5E60F5']}
            style={styles.continueBtn}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.continueText}>Create Account</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <BlurView intensity={40} tint="dark" style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.line} />
            <Text style={styles.doneIcon}>✓</Text>
            <Text style={styles.doneTitle}>Account Created!</Text>
            <Text style={styles.doneText}>
              Your account has been created successfully.
            </Text>
            <TouchableOpacity
              style={styles.openBtn}
              onPress={() => {
                setShowSuccess(false);
                navigation.replace('home_screen');
              }}>
              <Text style={styles.openText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  googleIcon: {
    width: 30,
    height: 30,
    bottom: 1,
  },

  container: {
    flex: 1,
    padding: 30,
  },

  backBtn: {
    width: 45,
    height: 45,
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 25,
    marginTop: 5,
  },

  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
    color: '#333',
  },

  input: {
    backgroundColor: '#EDEDED',
    borderRadius: 14,
    padding: 15,
    fontSize: 15,
  },

  passwordBox: {
    backgroundColor: '#EDEDED',
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  continueBtn: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  googleBtn: {
    height: 60,
    backgroundColor: '#ECECEC',
    borderRadius: 30,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  googleText: {
    fontSize: 18,
    fontWeight: '600',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: '#E8E4FF',
    paddingTop: 15,
  },

  signIn: {
    color: '#6C63FF',
    fontWeight: '600',
  },

  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: '#fff',
    height: 320,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    alignItems: 'center',
  },

  line: {
    width: 60,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },

  doneIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  doneTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },

  doneText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },

  openBtn: {
    width: '100%',
    padding: 18,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: '#6C4CF1',
    alignItems: 'center',
  },

  openText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
