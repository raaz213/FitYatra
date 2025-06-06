import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions, SafeAreaView } from "react-native";
import { Appbar, Card, Text, useTheme } from "react-native-paper";
import { fetchNutritionDietById } from "../../../services/user/nutrition/Diet";
import { Diet } from "../../../types/user/nutrition/diet";
import { API_URL } from "../../../constants/apiUrl";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const COLORS = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

const NutritionDetailsScreen: React.FC = ({ route, navigation }: any) => {
  const theme = useTheme();
  const { dietId } = route.params;
  const [diet, setDiet] = useState<Diet | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNutritionDetails = async () => {
    try {
      const response = await fetchNutritionDietById(dietId);
      setDiet(response);
    } catch (error) {
      console.error('Error fetching nutrition details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutritionDetails();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!diet) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Diet not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction 
          iconColor={COLORS.text} 
          onPress={() => navigation.goBack()} 
        />
        <Appbar.Content
          title={diet.name}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: `${API_URL}/uploads/${diet.image}` }}
            style={styles.heroImage}
          />
          <View style={styles.overlay}>
            <View style={styles.calorieTag}>
              <Text style={styles.calorieText}>
                {diet.totalCalories} kcal
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>
            {diet.benefits}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{diet.totalCalories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{diet.intake}</Text>
              <Text style={styles.statLabel}>Intake (g)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: COLORS.success }]}>
                {diet.macronutrient ? 
                  Math.round((diet.macronutrient.protein + diet.macronutrient.carbohydrates + diet.macronutrient.fats)) 
                  : 0
                }
              </Text>
              <Text style={styles.statLabel}>Total Macros (g)</Text>
            </View>
          </View>
        </View>

        {/* Macronutrient Breakdown */}
        {diet.macronutrient && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
            <View style={styles.macroGrid}>
              <View style={[styles.macroCard, { backgroundColor: COLORS.primaryLight }]}>
                <Text style={[styles.macroValue, { color: COLORS.primary }]}>
                  {diet.macronutrient.protein}g
                </Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={[styles.macroCard, { backgroundColor: COLORS.warningLight }]}>
                <Text style={[styles.macroValue, { color: COLORS.warning }]}>
                  {diet.macronutrient.carbohydrates}g
                </Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <View style={[styles.macroCard, { backgroundColor: COLORS.successLight }]}>
                <Text style={[styles.macroValue, { color: COLORS.success }]}>
                  {diet.macronutrient.fats}g
                </Text>
                <Text style={styles.macroLabel}>Fats</Text>
              </View>
            </View>
          </View>
        )}

        {/* Key Features */}
        {diet.features && diet.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresContainer}>
              {diet.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureBullet} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.white,
    elevation: 0,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroContainer: {
    position: 'relative',
    height: 240,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  calorieTag: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  calorieText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  macroGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  macroCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  featuresContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 7,
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
});

export default NutritionDetailsScreen;