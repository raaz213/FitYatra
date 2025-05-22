import { ScrollView, StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import MyCarousel from "../../components/user/MyCarousel";
import MySearchBar from "../../components/user/MySearchBar";
import StepTracker from "../../components/user/StepTracker";

const HomeScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <MySearchBar />
        </View>

        {/* Main Content Section */}
        <View style={styles.mainContent}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>Ready to achieve your goals?</Text>
          </View>

          {/* Motivational Quote Section */}
          <View style={styles.quoteSection}>
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>"No Pain, No Gain"</Text>
              <View style={styles.quoteLine} />
            </View>
          </View>

          {/* Carousel Section */}
          <View style={styles.carouselSection}>
            <Text style={styles.sectionTitle}>Featured Content</Text>
            <MyCarousel />
          </View>
          {/* StepTracker Section */}
          <View style={{marginTop: 20}}>
            <StepTracker />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainContent: {
    paddingHorizontal: 16,
  },
  welcomeSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '400',
  },
  quoteSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  quoteContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    width: '100%',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  quoteLine: {
    width: 60,
    height: 3,
    backgroundColor: '#007bff',
    marginTop: 12,
    borderRadius: 2,
  },
  carouselSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
    paddingLeft: 4,
  },
});

export default HomeScreen;