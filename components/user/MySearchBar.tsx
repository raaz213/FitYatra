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
      iconColor="#6c757d"
      placeholderTextColor="#adb5bd"
      theme={{
        colors: {
          primary: '#007bff',
          onSurfaceVariant: '#6c757d',
        }
      }}
      elevation={0}
      mode="bar"
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
    color: '#212529',
    minHeight: 0,
    paddingVertical: 8,
  },
});

export default MySearchBar; 