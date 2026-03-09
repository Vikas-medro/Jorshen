import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  // 🔥 Dynamic Data
  const videos = [
    {
      id: 1,
      title: 'The IPO parade continues as Wish files',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa',
    },
    {
      id: 2,
      title: 'Insurtech startup PasarPolis',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
    },
  ];

  const news = [
    { id: 1, title: 'Insurtech startup PasarPolis gets $54 million — Series B' },
    { id: 2, title: 'Hypatos gets $11.8M for a deep learning approach' },
    { id: 3, title: 'The IPO parade continues as Wish files, Bumble targets' },
  ];

  // 🔥 Filter Logic
  const filteredVideos = videos.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#333"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Feather name="search" size={20} color="#000" />
        </View>

        {/* Videos Section */}
        {filteredVideos.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{filteredVideos.length} Videos</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filteredVideos.map((video) => (
                <View key={video.id} style={styles.videoCard}>
                  <Image source={{ uri: video.image }} style={styles.videoImage} />
                  <View style={styles.playIcon}>
                    <Ionicons name="play" size={18} color="#fff" />
                  </View>
                  <Text style={styles.videoText}>{video.title}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {/* News Section */}
        {filteredNews.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{filteredNews.length} News</Text>
            </View>

            <View style={styles.newsList}>
              {filteredNews.map((item) => (
                <Text key={item.id} style={styles.newsItem}>
                  {item.title}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* No Results */}
        {filteredVideos.length === 0 && filteredNews.length === 0 && searchText !== '' && (
        
          <Image source={require('../assets/Images/no_result.png')} style={{ width: 300, height: 200, marginTop: 100, marginLeft: 35, marginTop: 100 }} />
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('home_screen')}>
          <Ionicons name="home-outline" size={26} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('bookmarks')}>
          <Ionicons name="bookmark-outline" size={26} color="#888" />
        </TouchableOpacity>

        <Ionicons name="search" size={24} color="#000" />

           <TouchableOpacity onPress={() => navigation.navigate('unread')}>
        <Ionicons name="notifications-outline" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <Ionicons name="settings-outline" size={26} color="#888" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
  },

  searchContainer: {
    marginTop: 70,
    marginLeft: 40,
    backgroundColor: '#e5e7eb',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 55,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    

    shadowColor: '#c700fe',

 
    elevation: 15,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#111827',
  },

  videoCard: {
    width: 260,
    height: 170,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
  },

  videoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  playIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoText: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  newsList: {
    marginTop: 10,
  },

  newsItem: {
    fontSize: 18,
    marginBottom: 20,
    color: '#111827',
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
  },
});
