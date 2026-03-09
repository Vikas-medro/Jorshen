import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewsDetailScreen = ({ navigation, route }) => {

  // ✅ Get data from HomeScreen
const news = route?.params?.news;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: news.image }}
            style={styles.image}
          />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content Card */}
        <View style={styles.content}>

          {/* Author */}
          <View style={styles.authorRow}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/men/32.jpg',
              }}
              style={styles.avatar}
            />
            <Text style={styles.authorName}>Sumit Kumar</Text>
          </View>

          {/* Category */}
          <Text style={styles.category}>{news.category}</Text>

          {/* Title */}
          <Text style={styles.title}>
            {news.title}
          </Text>

          {/* Date */}
          <Text style={styles.date}>{news.date}</Text>

          <View style={styles.divider} />

          {/* Article Content */}
          <Text style={styles.article}>
            This is full article content related to "{news.title}".
            {'\n\n'}
            You can later pass full description from HomeScreen also.
          

          </Text>

        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <Ionicons name="chatbubble-outline" size={22} color="#666" />
        <Ionicons name="bookmark-outline" size={22} color="#666" />
        <Ionicons name="share-social-outline" size={22} color="#666" />
      </View>

    </SafeAreaView>
  );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // outer dark background
  },

  imageContainer: {
    height: 320,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    marginTop: -30,
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 12,
  },

  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  category: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 34,
  },

  date: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },

  article: {
    fontSize: 17,
    lineHeight: 26,
    color: '#374151',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#f3f4f6',
    width: 200,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});