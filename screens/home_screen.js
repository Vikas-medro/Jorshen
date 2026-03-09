import React, { useState } from 'react'; // ✅ added
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
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window');


const HomeScreen = ({ navigation }) => {
  
  
  // ✅ SEARCH STATE
  const [searchText, setSearchText] = useState('');
  // ✅ TAG FILTER STATE
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedTags, setSelectedTags] = useState([]);

  // ✅ NEWS DATA MOVED TO ARRAY (required for filtering)
  const newsData = [
    
    {
      id: '1',
      category: 'TECHNOLOGY',
      tags: ['Science', 'For you'],
      title: 'Insurtech startup PasarPolis gets $54 million — Series B',
      date: '17 June, 2023 — 4:49 PM',
      image: 'https://images.unsplash.com/photo-1559526324-593bc073d938',
    },
    {
      id: '2',
      category: 'BUSINESS',
      tags: ['Politics'],
      title: 'The IPO parade continues as wish files, Bumble targests',
      date: '21 MAY, 2023 — 2:45 PM',
      image:
        'https://onemoneyway.com/wp-content/uploads/2024/08/00a85462f7845258ad247cbb395cf0e5-1024x576.jpg',
    },
    {
      id: '3',
      category: 'TECHNOLOGY',
      tags: ['Science'],
      title: 'Collective, a startup building a decentralized Twitter.',
      date: '10 June, 2023 — 12:30 PM',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwbnkw_BkRvCTNbfckbt6ZpPEh5plqa2VCg&s',
    },
    {
      id: '4',
      category: 'PLACES',
      tags: ['Politics', 'Science'],
      title: 'Jaipur Hawa Mahal: A blend of history and culture',
      date: '17 June, 2023 — 4:49 PM',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9R-pGURT_eKhM0rLqJzMEcQxUQMzDpHAN7g&s',
    },
  ];

  const toggleTag = (tag) => {
    //  If "For you" clicked → RESET everything
    if (tag === 'For you') {
      setSelectedTags([]);
      return;
    }

    //  Remove "For you" logic and toggle normally
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  //  FILTER LOGIC
  const filteredNews = newsData.filter((item) => {
    // search filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase());

    // tag filter
    const matchesTag =
      selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));

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
          renderItem={({ item }) => (
            <View style={styles.featuredCard}>
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.overlay} />
              <Text style={styles.featuredTitle}>{item.title}</Text>

              <View style={styles.featuredIcons}>
                <Icon name="chatbubble-outline" size={20} color="#fff" />
                <Icon name="bookmark-outline" size={20} color="#fff" />
                <Icon name="share-social-outline" size={20} color="#fff" />
              </View>
            </View>
          )}
        />

        {/* CATEGORY PILLS */}
        <View style={styles.tabs}>
          {['For you', 'Politics', 'Sports', 'Science'].map((tag) => {
            const isSelected =
              tag === 'For you' ? selectedTags.length === 0 : selectedTags.includes(tag);

            return (
              <TouchableOpacity key={tag} onPress={() => toggleTag(tag)}>
                <Text style={isSelected ? styles.activeTab : styles.tab}>{tag}</Text>
              </TouchableOpacity>
            );
          })}
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

        <TouchableOpacity>
          <Icon name="notifications-outline" size={26} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('setting')}>
          <Icon name="settings-outline" size={26} color="#888" />
        </TouchableOpacity>
      </View>
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EDEDED',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 25,

    shadowColor: '#c760e4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
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
