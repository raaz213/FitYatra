import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Surface,
  useTheme,
  Chip,
} from 'react-native-paper';
import { ArrowLeft, Target, Clock, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const NutritionDetailsScreen: React.FC = () => {
  const theme = useTheme();

  const macronutrients = [
    { label: 'Protein', percentage: '25%', color: '#4CAF50' },
    { label: 'Carbs', percentage: '45%', color: '#4CAF50' },
    { label: 'Fats', percentage: '30%', color: '#4CAF50' },
  ];

  const keyBenefits = [
    {
      id: '1',
      icon: Target,
      title: 'Balanced nutrition approach',
      description: 'Scientific blend of all essential nutrients',
    },
    {
      id: '2',
      icon: TrendingUp,
      title: 'Sustainable long-term',
      description: 'Easy to maintain lifestyle changes',
    },
    {
      id: '3',
      icon: Clock,
      title: 'Flexible meal timing',
      description: 'Adaptable to your daily schedule',
    },
  ];

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#FFF', elevation: 0 }}>
        <Appbar.BackAction iconColor="black" onPress={() => {}} />
        <Appbar.Content title="Balanced Diet" titleStyle={{ color: 'black', fontWeight: 'bold' }} />
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop'
            }}
            style={styles.heroImage}
          />
          <View style={styles.badgeContainer}>
            <Surface style={styles.badge} elevation={2}>
              <Target size={16} color="#2196F3" />
              <Text variant="bodySmall" style={styles.badgeText}>
                Balanced Nutrition
              </Text>
            </Surface>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text variant="bodyLarge" style={styles.description}>
            The scientific choice for nutrition
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              2000-22
            </Text>
            <Text variant="headlineSmall" style={styles.statNumber}>
              00
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Daily Calories
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              4-6
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              weeks
            </Text>
            <Text variant="bodySmall" style={styles.statSubLabel}>
              Duration
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={[styles.statNumber, { color: '#4CAF50' }]}>
              Easy
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Difficulty
            </Text>
          </View>
        </View>

        {/* Macronutrient Breakdown */}
        <View style={styles.sectionContainer}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Macronutrient Breakdown
          </Text>
          
          <View style={styles.macroContainer}>
            {macronutrients.map((macro, index) => (
              <View key={index} style={styles.macroItem}>
                <Text variant="headlineMedium" style={[styles.macroPercentage, { color: macro.color }]}>
                  {macro.percentage}
                </Text>
                <Text variant="bodyMedium" style={styles.macroLabel}>
                  {macro.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Key Benefits */}
        <View style={styles.sectionContainer}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Key Benefits
          </Text>
          
          <View style={styles.benefitsContainer}>
            {keyBenefits.map((benefit) => (
              <Surface key={benefit.id} style={styles.benefitCard} elevation={1}>
                <View style={styles.benefitContent}>
                  <View style={styles.benefitIconContainer}>
                    <benefit.icon size={20} color="#2196F3" />
                  </View>
                  <View style={styles.benefitTextContainer}>
                    <Text variant="bodyLarge" style={styles.benefitTitle}>
                      {benefit.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.benefitDescription}>
                      {benefit.description}
                    </Text>
                  </View>
                </View>
              </Surface>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  badgeText: {
    marginLeft: 6,
    color: '#2196F3',
    fontWeight: '500',
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  description: {
    color: '#666',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 28,
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
  },
  statSubLabel: {
    color: '#666',
    fontSize: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroPercentage: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  macroLabel: {
    color: '#666',
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  benefitContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  benefitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  benefitDescription: {
    color: '#666',
    lineHeight: 18,
  },
});

export default NutritionDetailsScreen;