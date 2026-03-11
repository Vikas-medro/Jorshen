import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const BookmarkScreen = ({ navigation }) => {

  // ✅ Dynamic bookmarks state instead of hardcoded UI
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem('@bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      } else {
        setBookmarks([]);
      }
    } catch (e) {
      console.log('Error loading bookmarks', e);
    }
  };


  // ✅ Delete function
  const deleteBookmark = async (id) => {
    try {
      const updatedBookmarks = bookmarks.filter(item => item.id !== id);
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem('@bookmarks', JSON.stringify(updatedBookmarks));
    } catch (e) {
      console.log('Error deleting bookmark', e);
    }
  };


  // ✅ Right swipe delete button
  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteBookmark(id)}
      >
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <LinearGradient colors={['#db3964', '#6A1B9A']} style={styles.menuButton}>
          <Ionicons name="menu" size={20} color="#fff" />
        </LinearGradient>

        <LinearGradient
          colors={['#db3964', '#6A1B9A']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.circle}>
          <Ionicons name="search" size={20} color={'white'} />
        </LinearGradient>
      </View>


      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Collections</Text>


        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 20 }}>

          <View style={styles.categoryCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>SPORTS</Text>
          </View>

          <View style={styles.categoryCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>TECH</Text>
          </View>

          <View style={styles.categoryCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>BUSINESS</Text>
          </View>

        </ScrollView>


        <Text style={styles.subtitle}>Latest bookmarks</Text>


        {/* ✅ Dynamic bookmark list */}
        {bookmarks.map((item) => (

          <Swipeable
            key={item.id}
            renderRightActions={() => renderRightActions(item.id)}
          >

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('news', { news: item })}
            >
              <View style={styles.newsRow}>
                <Image source={{ uri: item.image }} style={styles.newsImage} />

                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.tag}>{item.tag}</Text>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>

          </Swipeable>

        ))}

        {bookmarks.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#999', fontSize: 16 }}>
            No bookmarks saved yet.
          </Text>
        )}

        <View style={{ height: 100 }} />

      </ScrollView>



      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>

        <TouchableOpacity onPress={() => navigation.navigate('home_screen')}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>

        <Ionicons name="bookmark" size={24} color="#000" />

        <TouchableOpacity onPress={() => navigation.navigate('search')}>
          <Ionicons name="search-outline" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('unread')}>
          <Ionicons name="notifications-outline" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <Ionicons name="settings-outline" size={24} color="#999" />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default BookmarkScreen;



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },

  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#111827',
  },

  subtitle: {
    fontSize: 26,
    fontWeight: '600',
    marginVertical: 15,
    color: '#111827',
  },

  categoryCard: {
    width: 140,
    height: 140,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  largeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  tag: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    marginBottom: 5,
  },

  largeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },

  newsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },

  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
  },

  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginBottom: 20,
    borderRadius: 20,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 25,
    left: 55,
    right: 55,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

});