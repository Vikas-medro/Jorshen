import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Profile = ({ navigation }) => {

  // ✅ States (NO HARDCODING)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = 'Enter valid 10 digit phone number';
      valid = false;
    }

    if (!gender) {
      newErrors.gender = 'Please select gender';
      valid = false;
    }

    if (!dob) {
      newErrors.dob = 'Date of birth is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Update
  const handleUpdate = () => {
    if (validate()) {
      const updatedData = {
        firstName,
        lastName,
        phone,
        gender,
        dob
      };

      console.log('Updated Profile:', updatedData);
      Alert.alert('Success', 'Profile Updated Successfully');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
          <View style={styles.headerRow}>
         <LinearGradient
          colors={['#db3964', '#6A1B9A']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.circle}>
          <Icon name="menu" size={20} color={'white'} />
        </LinearGradient>

   
        <LinearGradient
          colors={['#db3964', '#6A1B9A']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.circle}>
          <Icon name="search" size={20} color={'white'} />
        </LinearGradient>
      </View>

        <Text style={styles.title}>Profile</Text>

        {/* Card */}
        <View style={styles.card}>

          {/* Profile Info */}
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>
                {firstName && lastName
                  ? `${firstName} ${lastName}`
                  : 'Your Name'}
              </Text>
              <Text style={styles.role}>
                {gender ? gender : 'Your Role'}
              </Text>
            </View>
          </View>

          {/* First Name */}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

          {/* Last Name */}
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

          {/* Phone */}
          <View style={styles.phoneBox}>
            <Text style={styles.flag}>🇮🇳</Text>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
          </View>
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

          {/* Gender */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowGenderModal(true)}
          >
            <Text style={{ color: gender ? '#000' : '#888' }}>
              {gender || 'Select your gender'}
            </Text>
            <Icon name="chevron-down-outline" size={20} />
          </TouchableOpacity>
          {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

          {/* DOB */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: dob ? '#000' : '#888' }}>
              {dob || 'What is your date of birth?'}
            </Text>
          </TouchableOpacity>
          {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

          {/* Update Button */}
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateText}>Update Profile</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Gender Modal */}
      <Modal visible={showGenderModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {['Male', 'Female', 'Other'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => {
                  setGender(item);
                  setShowGenderModal(false);
                }}
              >
                <Text style={{ fontSize: 16 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const formatted =
                selectedDate.getDate() +
                '-' +
                (selectedDate.getMonth() + 1) +
                '-' +
                selectedDate.getFullYear();
              setDob(formatted);
            }
          }}
        />
      )}

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={26} color="#999" 
        onPress={()=> navigation.navigate('home_screen')}/>
        <Icon name="bookmark-outline" size={26} color="#999" />
        <Icon name="search-outline" size={26} color="#999" />
        <Icon name="notifications-outline" size={26} color="#999" />
        <Icon name="settings-outline" size={26} color="#000" />
      </View>

    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#EDEDED' },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
    circle: {
    width: 40,
    marginTop:40,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },


  menuBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A020F0',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#A020F0',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 42,
    fontWeight: '800',
    paddingHorizontal: 20,
    marginBottom: 20
  },

  card: {
    backgroundColor: '#F7F7F7',
    marginHorizontal: 20,
    borderRadius: 40,
    padding: 25,
    elevation: 5,
    shadowColor: '#c700fe'
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15
  },

  name: { fontSize: 22, fontWeight: '700' },

  role: { color: '#555' },

  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA'
  },

  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DADADA'
  },

  flag: { marginRight: 10, fontSize: 18 },

  updateBtn: {
    marginTop: 20,
    marginLeft: 95,
    width: '40%',
    height: 40,
    backgroundColor: '#6C4BFF',
    paddingVertical: 8,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 12
  },

  bottomNav: {

  position: 'absolute',
  bottom: 25,
  left: 55,
  right: 55,
  height: 50,
  backgroundColor: '#fff',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: 35,
     elevation: 4,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalBox: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    padding: 20
  },

  modalItem: {
    paddingVertical: 15
  }
});