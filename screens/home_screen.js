import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CommentModal from '../components/CommentModal';


const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [showComments, setShowComments] = useState(false);

  // ✅ BOOKMARK STATE
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // Load bookmarks when returning to Home
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem('@bookmarks');
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarkedIds(parsed.map(b => b.id));
      }
    } catch (e) {
      console.log('Error loading bookmarks', e);
    }
  };

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: `${item.title}\n\nRead more on Jorshan Media!`,
        title: item.title,
      });
    } catch (e) {
      console.log('Error sharing', e);
    }
  };

  const toggleBookmark = async (item) => {
    try {
      const stored = await AsyncStorage.getItem('@bookmarks');
      let bookmarks = stored ? JSON.parse(stored) : [];

      const exists = bookmarks.find(b => b.id === item.id);
      if (exists) {
        // Remove it
        bookmarks = bookmarks.filter(b => b.id !== item.id);
        setBookmarkedIds(bookmarkedIds.filter(id => id !== item.id));
      } else {
        // Add it - save minimal data needed for bookmarks screen
        bookmarks.unshift({
          id: item.id,
          title: item.title,
          image: item.image,
          tag: item.category || 'FEATURED',
          type: 'large' // Used in bookmarks.js to conditionally render styles
        });
        setBookmarkedIds([...bookmarkedIds, item.id]);
      }

      await AsyncStorage.setItem('@bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.log('Error toggling bookmark', e);
    }
  };

  // ✅ SEARCH STATE
  const [searchText, setSearchText] = useState('');
  // ✅ TAG FILTER STATE
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedTags, setSelectedTags] = useState([]);

  // ✅ NEWS DATA — category is the single source of truth for filtering
  const newsData = [
    {
      id: '1',
      category: 'TECHNOLOGY',
      title: 'Insurtech startup PasarPolis gets $54 million — Series B',
      date: '17 June, 2023 — 4:49 PM',
      image: 'https://images.unsplash.com/photo-1559526324-593bc073d938',
    },
    {
      id: '2',
      category: 'BUSINESS',
      title: 'The IPO parade continues as Bumble targets the market',
      date: '21 MAY, 2023 — 2:45 PM',
      image:
        'https://onemoneyway.com/wp-content/uploads/2024/08/00a85462f7845258ad247cbb395cf0e5-1024x576.jpg',
    },
    {
      id: '3',
      category: 'TECHNOLOGY',
      title: 'Collective, a startup building a decentralized Twitter.',
      date: '10 June, 2023 — 12:30 PM',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwbnkw_BkRvCTNbfckbt6ZpPEh5plqa2VCg&s',
    },
    {
      id: '4',
      category: 'PLACES',
      title: 'Jaipur Hawa Mahal: A blend of history and culture',
      date: '17 June, 2023 — 4:49 PM',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9R-pGURT_eKhM0rLqJzMEcQxUQMzDpHAN7g&s',
    },
    {
      id: '5',
      category: 'POLITICS',
      title: 'G20 Summit: World leaders agree on climate action framework',
      date: '05 Mar, 2023 — 9:00 AM',
      image:
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
    },
    {
      id: '6',
      category: 'SPORTS',
      title: 'India clinches T20 series against Australia in final over thriller',
      date: '02 Apr, 2023 — 6:30 PM',
      image:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    },
    {
      id: '7',
      category: 'BUSINESS',
      title: 'Startup founders reveal top fundraising mistakes to avoid',
      date: '12 Feb, 2023 — 11:15 AM',
      image:
        'https://images.unsplash.com/photo-1556761175-4b46a572b786',
    },
    {
      id: '8',
      category: 'PLACES',
      title: 'Top 10 hidden gems in Rajasthan you must visit in 2023',
      date: '20 Jan, 2023 — 8:00 AM',
      image:
        'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    },
  ];

  const toggleTag = (tag) => {
    // "For you" resets all filters
    if (tag === 'For you') {
      setSelectedTags([]);
      return;
    }
    // toggle the clicked tag on/off
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // FILTER LOGIC — match against item.category (single source of truth)
  const filteredNews = newsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase());

    // When tags are active, item.category must exactly match one of them
    const matchesTag =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => item.category.toUpperCase() === tag.toUpperCase());

    return matchesSearch && matchesTag;
  });
  const featuredData = [
    {
      id: '1',
      image:
        'https://cdn.theatlantic.com/thumbor/FPTWEk2jCD_GOlSx-Q3p04tDPOk=/302x50:4317x2308/1600x900/media/img/mt/2014/08/shutterstock_187027727-1/original.jpg',
      title: 'Microsoft launches a deepfake detector tool',
    },
    {
      id: '2',
      image: 'https://ewm.swiss/application/files/5716/0379/3279/social_media_.jpg',
      title: 'Microsoft expands AI security globally',
    },
  ];
  const translateX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -width,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={require('../assets/Images/small_logo.png')} style={styles.logo} />
          <View style={styles.M}>
            <Text style={styles.logoText}>JORSHAN</Text>
            <Text style={styles.logoText}>MEDIA</Text>
          </View>
        </View>

        {/* BREAKING RIBBON */}
        <View style={styles.ribbonContainer}>
          <View style={styles.ribbon}>

            <Animated.View
              style={{
                flexDirection: 'row',
                transform: [{ translateX }],
              }}
            >
              {/* Text copy 1 */}
              <Text style={styles.ribbonText}>
                🔥 BREAKING NEWS 🔥 BREAKING NEWS 🔥 BREAKING NEWS 🔥
              </Text>

              {/* Text copy 2 (duplicate for seamless loop) */}
              <Text style={styles.ribbonText}>
                🔥 BREAKING NEWS 🔥 BREAKING NEWS 🔥 BREAKING NEWS 🔥
              </Text>

            </Animated.View>

          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBox}>
            <Icon name="search-outline" size={18} color="#999" />

            {/* ✅ LIVE SEARCH INPUT */}
            <TextInput
              placeholder="Search...."
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* FEATURED */}
        <FlatList
          data={featuredData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 20 }}
          renderItem={({ item }) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            return (
              <View style={styles.featuredCard}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <View style={styles.overlay} />
                <Text style={styles.featuredTitle}>{item.title}</Text>

                <View style={styles.featuredIcons}>
                  <TouchableOpacity onPress={() => setShowComments(true)}>
                    <Icon name="chatbubble-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleBookmark(item)}>
                    <Icon name={isBookmarked ? "bookmark" : "bookmark-outline"} size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleShare(item)}>
                    <Icon name="share-social-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        {/* CATEGORY PILLS — fixed rounded box, pills scroll inside */}
        <View style={styles.tabsBox}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContent}
          >
            {['For you', 'Politics', 'Sports', 'Science', 'Technology', 'Business', 'Places'].map((tag) => {
              const isSelected =
                tag === 'For you' ? selectedTags.length === 0 : selectedTags.includes(tag);
              return (
                <TouchableOpacity key={tag} onPress={() => toggleTag(tag)}>
                  <Text style={isSelected ? styles.activeTab : styles.tab}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {/* ✅ FILTERED NEWS LIST */}
        {filteredNews.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('news', { news: item })}
          >
            <View style={styles.newsItem}>
              <Image source={{ uri: item.image }} style={styles.newsImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* NO RESULT MESSAGE */}
        {filteredNews.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>No news found</Text>
        )}
      </ScrollView>

      {/* BOTTOM NAV SAME */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home-outline" size={26} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('bookmarks')}>
          <Icon name="bookmark-outline" size={26} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('search')}>
          <Icon name="search-outline" size={26} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('unread')}>
          <Icon name="notifications-outline" size={26} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <Icon name="settings-outline" size={26} color="#888" />
        </TouchableOpacity>
      </View>

      {/* 💬 COMMENTS MODAL */}
      <CommentModal visible={showComments} onClose={() => setShowComments(false)} />

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },

  logo: {
    width: 30,
    height: 23,
    marginRight: 10,
  },

  logoText: {
    fontWeight: '700',
    fontSize: 11,
    margin: -2,
  },

  /* BREAKING RIBBON */
  ribbonContainer: {
    height: 40,
    overflow: 'hidden',
  },

  ribbon: {
    backgroundColor: '#FF1F1F',
    height: 40,
    justifyContent: 'center',
  },

  ribbonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    paddingRight: 50, // spacing between repeats
  },

  ribbon: {
    backgroundColor: '#FF1F1F',
    paddingVertical: 10,
  },

  ribbonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 2,
  },

  /* SEARCH */
  searchWrapper: {
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: 10,
  },

  searchBox: {
    backgroundColor: '#fff',
    width: 130,
    height: 35,

    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 0,

    shadowColor: '#c700fe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  searchInput: {
    marginLeft: 8,
    fontSize: 13,
  },

  /* FEATURED CARDS */
  featuredCard: {
    width: width * 0.7,
    height: 220,
    borderRadius: 25,
    marginRight: 20,
    overflow: 'hidden',
    marginTop: 20,
  },

  featuredImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  featuredTitle: {
    position: 'absolute',
    bottom: 60,
    left: 15,
    right: 15,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  featuredIcons: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /* CATEGORY PILLS */
  tabsBox: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: '#EDEDED',
    borderRadius: 25,
    overflow: 'hidden',           // clips scrolling content to rounded corners
    shadowColor: '#c760e4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  tabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 4,
  },

  activeTab: {
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#ec4646',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tab: {
    color: '#777',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  /* NEWS LIST */
  newsItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 25,
  },

  newsImage: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginRight: 15,
  },

  category: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },

  newsTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  M: {
    flexDirection: 'column',
    margin: -3,
  },

  date: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
  },

  /* FLOATING NAV */
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
