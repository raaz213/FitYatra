import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ChevronDown, ChevronRight, Home, Dumbbell, Apple, Plus, Eye, Grid } from "lucide-react-native";
import CreateExercise from "../../screens/admin/exercise/CreateExercise";
import ViewExercise from "../../screens/admin/exercise/ViewExercise";
import ViewNutrition from "../../screens/admin/nutrition/ViewNutrition";
import CreateNutrition from "../../screens/admin/nutrition/CreateNutrition";
import HomeScreen from "../../screens/admin/home/HomeScreen";
import ExerciseCategoryScreen from "../../screens/admin/exercise/ExerciseCategoryScreen";
import ExerciseSubcategoryScreen from "../../screens/admin/exercise/ExerciseSubcategoryScreen";
import NutritionCategoryScreen from "../../screens/admin/nutrition/NutritionCategoryScreen";
import NutritionSubcategoryScreen from "../../screens/admin/nutrition/NutritionSubcategoryScreen";
import { window } from "../../constants/sizes";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ExerciseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExerciseCategory" component={ExerciseCategoryScreen} />
      <Stack.Screen name="ExerciseSubcategory" component={ExerciseSubcategoryScreen} />
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
      <Stack.Screen name="ViewExercise" component={ViewExercise} />
    </Stack.Navigator>
  );
};

const NutritionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NutritionCategory" component={NutritionCategoryScreen} />
      <Stack.Screen name="NutritionSubcategory" component={NutritionSubcategoryScreen} />
      <Stack.Screen name="CreateNutrition" component={CreateNutrition} />
      <Stack.Screen name="ViewNutrition" component={ViewNutrition} />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [exerciseExpanded, setExerciseExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const navigation = useNavigation<any>();

  const navigateToScreen = (screenName: string, params?: any) => {
    navigation.navigate(screenName, params);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.appTitle}>FitYatra</Text>
      </View>
      
      <ScrollView style={styles.menuContainer}>
        {/* Home */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToScreen('Home')}
        >
          <Home size={20} color="#333" style={styles.menuIcon} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        {/* Exercise with submenu */}
        <View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setExerciseExpanded(!exerciseExpanded)}
          >
            <Dumbbell size={20} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Exercise</Text>
            {exerciseExpanded ? (
              <ChevronDown size={16} color="#666" />
            ) : (
              <ChevronRight size={16} color="#666" />
            )}
          </TouchableOpacity>
          
          {exerciseExpanded && (
            <View style={styles.submenuContainer}>
              <TouchableOpacity
                style={styles.submenuItem}
                onPress={() => navigateToScreen('Exercise', { screen: 'ExerciseCategory' })}
              >
                <Grid size={16} color="#666" style={styles.submenuIcon} />
                <Text style={styles.submenuText}>Category</Text>
              </TouchableOpacity>

               <TouchableOpacity
                style={styles.submenuItem}
                onPress={() => navigateToScreen('Exercise', { screen: 'ExerciseSubcategory' })}
              >
                <Grid size={16} color="#666" style={styles.submenuIcon} />
                <Text style={styles.submenuText}>Subcategory</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.submenuItem}
                onPress={() => navigateToScreen('Exercise', { screen: 'ViewExercise' })}
              >
                <Eye size={16} color="#666" style={styles.submenuIcon} />
                <Text style={styles.submenuText}>Workout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Nutrition with submenu */}
        <View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setNutritionExpanded(!nutritionExpanded)}
          >
            <Apple size={20} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Nutrition</Text>
            {nutritionExpanded ? (
              <ChevronDown size={16} color="#666" />
            ) : (
              <ChevronRight size={16} color="#666" />
            )}
          </TouchableOpacity>
          
          {nutritionExpanded && (
            <View style={styles.submenuContainer}>
               <TouchableOpacity
                style={styles.submenuItem}
                onPress={() => navigateToScreen('Nutrition', { screen: 'NutritionCategory' })}
              >
                <Plus size={16} color="#666" style={styles.submenuIcon} />
                <Text style={styles.submenuText}>Category</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submenuItem}
                onPress={() => navigateToScreen('Nutrition', { screen: 'NutritionSubcategory' })}
              >
                <Plus size={16} color="#666" style={styles.submenuIcon} />
                <Text style={styles.submenuText}>Subcategory</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.submenuItem}
                onPress={() => navigateToScreen('Nutrition', { screen: 'ViewNutrition' })}
              >
                <Eye size={16} color="#666" style={styles.submenuIcon} />
                <Text style={styles.submenuText}>Diet</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: "FitYatra",
        headerTitleStyle: {
          fontSize: 20,
          letterSpacing: 4,
        },
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Exercise" component={ExerciseStack} />
      <Drawer.Screen name="Nutrition" component={NutritionStack} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#06407a',
    borderRadius: 10,
 
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    textAlign: 'center'
  },
  menuContainer: {
    flex: 1,
  
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  submenuContainer: {
   
    marginTop: 5,
    marginBottom: 10,
  },
  submenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 1,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  submenuIcon: {
    marginRight: 12,
  },
  submenuText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
});

export default DrawerNavigator;