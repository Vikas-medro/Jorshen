import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UnreadScreen = ({ navigation }) => {
  // 🔥 Dynamic Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      category: 'TECHNOLOGY',
      title: 'Insurtech startup PasarPolis gets $54 million — Series B',
      date: 'Today',
    },
    {
      id: '2',
      category: 'BUSINESS',
      title: 'Hypatos gets $11.8M for a deep learning approach',
      date: 'Today',
    },
    {
      id: '3',
      category: 'BUSINESS',
      title: 'The IPO parade continues as Wish files, Bumble targets',
      date: '17 March, 2026',
    },
    {
      id: '4',
      category: 'BUSINESS',
      title: 'The IPO parade continues as Wish files',
      date: '17 March, 2026',
    },
  ]);

  // 🔥 Mark as Read (Remove)
  const markAsRead = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔥 Group By Date
  const groupedData = notifications.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const renderSection = (date, data) => (
    <View key={date}>
      {date !== 'Today' && <Text style={styles.dateHeading}>{date}</Text>}

      <View style={styles.card}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[styles.notificationItem, index !== data.length - 1 && styles.divider]}>
            {/* LEFT CONTENT */}
            <View style={styles.textContainer}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            {/* RIGHT MINI BUTTON */}
            <TouchableOpacity style={styles.readBtn} onPress={() => markAsRead(item.id)}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <LinearGradient
          colors={['#db3964', '#6A1B9A']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.circle}>
          <Ionicons name="menu" size={20} color={'white'} />
        </LinearGradient>

        <LinearGradient
          colors={['#db3964', '#6A1B9A']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.circle}>
          <Ionicons name="search" size={20} color={'white'} />
        </LinearGradient>
      </View>

      <Text style={styles.heading}>Unread</Text>

      <FlatList
        data={Object.keys(groupedData)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderSection(item, groupedData[item])}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('home_screen')}>
          <Ionicons name="home-outline" size={26} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('bookmarks')}>
          <Ionicons name="bookmark-outline" size={26} color="#888" />
        </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('search')}>
               <Ionicons name="search-outline" size={26} color="#999" />
             </TouchableOpacity>

        <Ionicons name="notifications" size={24} color="#000" />
        
        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <Ionicons name="settings-outline" size={26} color="#888" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UnreadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
  },

  headerRow: {
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  menuBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#d100f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    marginTop: 40,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },

  notificationItem: {
    paddingVertical: 10,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },

  category: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 5,
  },

  title: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },

  dateHeading: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 15,
  },

  bottomNav: {
   position: 'absolute',
    bottom: 27,
    left: 50,
    right: 52,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 35,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  readBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#b0a0f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
