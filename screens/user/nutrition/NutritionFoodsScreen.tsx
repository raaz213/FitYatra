import React, { useState } from 'react';
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
  Chip,
  Surface,
  useTheme,
} from 'react-native-paper';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

interface NutritionFood {
  id: string;
  name: string;
  image: string;
  protein: string;
  calories: string;
  benefits: string[];
  goals: ('muscle-gain' | 'weight-loss' | 'all')[];
}

const nutritionFoods: NutritionFood[] = [
  // Foods good for both goals
  {
    id: '1',
    name: 'Chicken Breast',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=200&fit=crop',
    protein: '31g',
    calories: '165 cal',
    benefits: ['High Protein', 'Low Fat'],
    goals: ['muscle-gain', 'weight-loss'],
  },
  {
    id: '2',
    name: 'Salmon Fish',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop',
    protein: '25g',
    calories: '208 cal',
    benefits: ['Omega-3', 'High Protein'],
    goals: ['muscle-gain', 'weight-loss'],
  },
  {
    id: '3',
    name: 'Eggs',
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=300&h=200&fit=crop',
    protein: '13g',
    calories: '155 cal',
    benefits: ['Complete Protein', 'Vitamins'],
    goals: ['muscle-gain', 'weight-loss'],
  },
  {
    id: '4',
    name: 'Tuna',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop',
    protein: '30g',
    calories: '144 cal',
    benefits: ['Lean Protein', 'Low Calories'],
    goals: ['muscle-gain', 'weight-loss'],
  },

  // Muscle Gain Specific Foods (High Calorie, High Protein)
  {
    id: '5',
    name: 'Whole Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop',
    protein: '8g',
    calories: '150 cal',
    benefits: ['High Calories', 'Calcium'],
    goals: ['muscle-gain'],
  },
  {
    id: '6',
    name: 'Peanut Butter',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=200&fit=crop',
    protein: '8g',
    calories: '190 cal',
    benefits: ['Healthy Fats', 'High Calories'],
    goals: ['muscle-gain'],
  },
  {
    id: '7',
    name: 'Oats',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=300&h=200&fit=crop',
    protein: '6g',
    calories: '150 cal',
    benefits: ['Complex Carbs', 'Fiber'],
    goals: ['muscle-gain'],
  },
  {
    id: '8',
    name: 'Sweet Potato',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop',
    protein: '4g',
    calories: '112 cal',
    benefits: ['Complex Carbs', 'Beta Carotene'],
    goals: ['muscle-gain'],
  },
  {
    id: '9',
    name: 'Avocado',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=200&fit=crop',
    protein: '4g',
    calories: '320 cal',
    benefits: ['Healthy Fats', 'High Calories'],
    goals: ['muscle-gain'],
  },
  {
    id: '10',
    name: 'Brown Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
    protein: '5g',
    calories: '216 cal',
    benefits: ['Complex Carbs', 'Energy'],
    goals: ['muscle-gain'],
  },
  {
    id: '11',
    name: 'Almonds',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&h=200&fit=crop',
    protein: '6g',
    calories: '161 cal',
    benefits: ['Healthy Fats', 'Vitamin E'],
    goals: ['muscle-gain'],
  },
  {
    id: '12',
    name: 'Banana',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
    protein: '1g',
    calories: '105 cal',
    benefits: ['Quick Energy', 'Potassium'],
    goals: ['muscle-gain'],
  },

  // Weight Loss Specific Foods (Low Calorie, High Fiber)
  {
    id: '13',
    name: 'Broccoli',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=200&fit=crop',
    protein: '5g',
    calories: '55 cal',
    benefits: ['High Fiber', 'Low Calories'],
    goals: ['weight-loss'],
  },
  {
    id: '14',
    name: 'Spinach',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop',
    protein: '3g',
    calories: '23 cal',
    benefits: ['Iron', 'Very Low Calories'],
    goals: ['weight-loss'],
  },
  {
    id: '15',
    name: 'Cucumber',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=300&h=200&fit=crop',
    protein: '1g',
    calories: '16 cal',
    benefits: ['Hydrating', 'Very Low Calories'],
    goals: ['weight-loss'],
  },
  {
    id: '16',
    name: 'Greek Yogurt',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
    protein: '20g',
    calories: '100 cal',
    benefits: ['Probiotics', 'Low Fat'],
    goals: ['weight-loss'],
  },
  {
    id: '17',
    name: 'Cauliflower',
    image: 'https://images.unsplash.com/photo-1568584711271-946d4d46b7d5?w=300&h=200&fit=crop',
    protein: '3g',
    calories: '25 cal',
    benefits: ['High Fiber', 'Low Carbs'],
    goals: ['weight-loss'],
  },
  {
    id: '18',
    name: 'Bell Peppers',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop',
    protein: '1g',
    calories: '31 cal',
    benefits: ['Vitamin C', 'Low Calories'],
    goals: ['weight-loss'],
  },
  {
    id: '19',
    name: 'Zucchini',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=300&h=200&fit=crop',
    protein: '2g',
    calories: '20 cal',
    benefits: ['High Water', 'Low Calories'],
    goals: ['weight-loss'],
  },
  {
    id: '20',
    name: 'Green Tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop',
    protein: '0g',
    calories: '2 cal',
    benefits: ['Antioxidants', 'Metabolism Boost'],
    goals: ['weight-loss'],
  },
  {
    id: '21',
    name: 'Cottage Cheese',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=200&fit=crop',
    protein: '25g',
    calories: '163 cal',
    benefits: ['Casein Protein', 'Low Fat'],
    goals: ['weight-loss'],
  },
  {
    id: '22',
    name: 'Celery',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop',
    protein: '1g',
    calories: '14 cal',
    benefits: ['High Fiber', 'Negative Calories'],
    goals: ['weight-loss'],
  },
];

const NutritionFoodsScreen: React.FC = ({navigation}:any) => {
  const theme = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<'all' | 'muscle-gain' | 'weight-loss'>('all');

  const filteredFoods = nutritionFoods.filter(food => {
    if (selectedGoal === 'all') {
      return true;
    }
    return food.goals.includes(selectedGoal);
  });
   
  const handleNutritionDetails = (foodId: string) => {
    navigation.navigate('NutritionDetails', { foodId });
  };

  const renderFoodCard = (food: NutritionFood) => (
    <Card key={food.id} style={[styles.foodCard, { width: cardWidth }]}>
      <TouchableOpacity onPress={() => handleNutritionDetails(food.id)}>
      <Image source={{ uri: food.image }} style={styles.foodImage} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.foodName}>
          {food.name}
        </Text>
        <View style={styles.nutritionInfo}>
          <Surface style={[styles.nutritionChip, { backgroundColor: theme.colors.primaryContainer }]}>
            <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
              {food.protein}
            </Text>
          </Surface>
          <Surface style={[styles.nutritionChip, { backgroundColor: theme.colors.secondaryContainer }]}>
            <Text variant="bodySmall" style={{ color: theme.colors.onSecondaryContainer }}>
              {food.calories}
            </Text>
          </Surface>
        </View>
        <View style={styles.benefitsContainer}>
          {food.benefits.slice(0, 2).map((benefit, index) => (
            <Text key={index} variant="bodySmall" style={styles.benefitText}>
              • {benefit}
            </Text>
          ))}
        </View>
      </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  const getFilteredCount = () => {
    return filteredFoods.length;
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#FFF' }}>
        <Appbar.BackAction iconColor="black" onPress={() => {}} />
        <Appbar.Content title="Nutrition Foods" titleStyle={{ color: 'black' }} />
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {selectedGoal === 'all' 
              ? `Showing all ${getFilteredCount()} nutrition foods`
              : selectedGoal === 'muscle-gain'
              ? `${getFilteredCount()} foods for muscle gain`
              : `${getFilteredCount()} foods for weight loss`
            }
          </Text>
        </View>

        <View style={styles.chipContainer}>
          <Chip
            selected={selectedGoal === 'all'}
            onPress={() => setSelectedGoal('all')}
            style={[
              styles.chip,
              selectedGoal === 'all' && { backgroundColor: theme.colors.primary }
            ]}
            textStyle={selectedGoal === 'all' ? { color: 'white' } : {}}
          >
            All Goals
          </Chip>
          <Chip
            selected={selectedGoal === 'muscle-gain'}
            onPress={() => setSelectedGoal('muscle-gain')}
            style={[
              styles.chip,
              selectedGoal === 'muscle-gain' && { backgroundColor: '#4CAF50' }
            ]}
            textStyle={selectedGoal === 'muscle-gain' ? { color: 'white' } : {}}
          >
            Muscle Gain
          </Chip>
          <Chip
            selected={selectedGoal === 'weight-loss'}
            onPress={() => setSelectedGoal('weight-loss')}
            style={[
              styles.chip,
              selectedGoal === 'weight-loss' && { backgroundColor: '#FF9800' }
            ]}
            textStyle={selectedGoal === 'weight-loss' ? { color: 'white' } : {}}
          >
            Weight Loss
          </Chip>
        </View>

        <View style={styles.gridContainer}>
          {filteredFoods.map(renderFoodCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  chip: {
    marginRight: 0,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 16,
  },
  foodCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  foodName: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  nutritionInfo: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  nutritionChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitsContainer: {
    gap: 2,
  },
  benefitText: {
    color: '#666',
    fontSize: 11,
  },
});

export default NutritionFoodsScreen;