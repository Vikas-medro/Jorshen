// SettingsScreen.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.iconBox}>
      <Icon name={icon} size={24} color="#1E1E1E" />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    <Icon name="chevron-forward-outline" size={20} color="#aaa" />
  </TouchableOpacity>
);

const Setting = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Settings</Text>
        </View>

        {/* Main Section */}

        <MenuItem
          icon="person-outline"
          title="Profile settings"
          subtitle="Settings regarding your profile"
          onPress={() => navigation.navigate('profile')}
        />

        <MenuItem
          icon="newspaper-outline"
          title="News settings"
          subtitle="Choose your favourite topics"
        />

        <MenuItem
          icon="notifications-outline"
          title="Notifications"
          subtitle="When would you like to be notified"
        />

        <MenuItem
          icon="folder-outline"
          title="Subscriptions"
          subtitle="Currently, you are in Starter Plan"
        />

        {/* Other Section */}
        <Text style={styles.otherHeading}>Other</Text>

        <MenuItem icon="bug-outline" title="Bug report" subtitle="Report bugs very easy" />

        <MenuItem
          icon="share-social-outline"
          title="Share the app"
          subtitle="Share on social media networks"
        />

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('home_screen')}>
            <Icon name="home-outline" size={26} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('bookmarks')}>
            <Icon name="bookmark-outline" size={26} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <Icon name="search-outline" size={26} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('unread')}>
            <Icon name="notifications-outline" size={26} color="#999" />
          </TouchableOpacity>

          <Icon name="settings-outline" size={26} color="#000" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
  },
  circle: {
    width: 40,
    marginTop: 40,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuBtn: {
    width: 45,
    height: 45,

    backgroundColor: '#d100f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 3,
  },
  otherHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#1E1E1E',
  },
  bottomNav: {
    position: 'absolute',
    bottom: -185,
    left: 35,
    right: 35,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 35,
  },
});
