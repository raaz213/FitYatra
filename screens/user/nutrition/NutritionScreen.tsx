import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  Card,
  Button,

  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { ChevronRight, Wifi, Battery, Signal } from 'lucide-react-native';

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    accent: '#FF9800',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2E2E2E',
  },
};

interface DietOption {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const dietOptions: DietOption[] = [
  {
    id: 1,
    title: 'Balanced',
    description: 'The scientific choice for nutrition',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    color: '#E8F5E8',
  },
  {
    id: 2,
    title: 'Low carb',
    description: 'Low in carbs, high in flavor',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
    color: '#FFF3E0',
  },
  {
    id: 3,
    title: 'Keto',
    description: 'High fat, minimal carbs',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop',
    color: '#E3F2FD',
  },
  {
    id: 4,
    title: 'Vegetarian',
    description: 'Plant-based choices',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
    color: '#F3E5F5',
  },
];

const StatusBarComponent = () => (
  <View style={styles.statusBar}>
    <Text style={styles.time}>9:41</Text>
    <View style={styles.statusIcons}>
      <Signal size={16} color="#000" />
      <Wifi size={16} color="#000" />
      <Battery size={16} color="#000" />
    </View>
  </View>
);


const DietCard: React.FC<{ diet: DietOption; viewDietPress:(id:number)=>void }> = ({
  diet, viewDietPress
}) => (
  <Card style={[styles.card, { backgroundColor: diet.color }]} >
    <View style={styles.cardContent}>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{diet.title}</Text>
        <Text style={styles.cardDescription}>{diet.description}</Text>
        <Button
          mode="text"
          onPress={(()=>viewDietPress(1))}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          icon={({ size, color }) => (
            <ChevronRight size={size} color={color} />
          )}
        >
          View diet
        </Button>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: diet.image }} style={styles.cardImage} />
      </View>
    </View>
  </Card>
);

const NutritionScreen: React.FC = ({navigation}:any) => {
const viewDietPress = (id: number) => {
navigation.navigate('Diet', { dietId: id });
};

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <StatusBarComponent />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Diet</Text>
            <Text style={styles.headerSubtitle}>
              Which diet best suits with your personal tastes and preferences?
            </Text>
          </View>

          <View style={styles.cardsContainer}>
            {dietOptions.map((diet) => (
              <DietCard
                key={diet.id}
                diet={diet}
                viewDietPress={viewDietPress}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E2E2E',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginLeft: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default NutritionScreen;