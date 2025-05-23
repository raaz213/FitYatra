import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search for workouts, exercises..."
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
      inputStyle={styles.searchInput}
      iconColor="#d6d1d0"
      placeholderTextColor="#d6d1d0"
      elevation={0}
      mode="bar"
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    backgroundColor: '#5e5e5e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
    color: '#d6d1d0',
    minHeight: 0,
    paddingVertical: 8,
  },
});

export default MySearchBar; 