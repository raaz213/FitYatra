import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <LinearGradient
      colors={['#f5f5f5', '#ffffff', '#f5f5f5']}
      start={{ x: 0 , y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientContainer}
    >
      <Searchbar
        placeholder="Search for workouts, exercises"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor="#616263"
        placeholderTextColor='#616263'
        elevation={0}
        mode="bar"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 1,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 16,
    color: '#d6d1d0',
    minHeight: 0,
    paddingVertical: 8,
  },
});

export default MySearchBar;
