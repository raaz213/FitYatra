import { ChevronRight } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import { Category } from "../../../types/user/nutrition/Category";
import { API_URL } from "../../../constants/apiUrl";

interface DietCardProps {
  category: Category;
  viewDietPress: (id: string) => void;
}

const DietCard: React.FC<DietCardProps> = ({ category, viewDietPress }) => {
  return (
    <Card style={[styles.card, { backgroundColor: '#d0f5d6'}]}>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{category.name}</Text>
          <Text style={styles.cardDescription}>{category.description}</Text>
          <Button
            mode="text"
            onPress={() => viewDietPress(category._id)}
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
          <Image source={{ uri:`${API_URL}/uploads/${category.image}`}} style={styles.cardImage} />
        </View>
      </View>
    </Card>
  );
};

export default DietCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  cardText: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
    lineHeight: 20,
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    paddingHorizontal: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
    marginLeft: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
