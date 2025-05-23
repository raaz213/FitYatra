import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";

type TestimonialProps = {
  name: string;
  role?: string;
  photo: string; // URL
  rating: number; // 1 to 5
  review: string;
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <Text
        key={i}
        style={[styles.star, i < rating ? styles.starFilled : styles.starEmpty]}
      >
        ★
      </Text>
    ));
  return <View style={styles.starContainer}>{stars}</View>;
};

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  photo,
  rating,
  review,
}) => {
  const LeftContent = () => <Avatar.Image size={48} source={{ uri: photo }} />;

  return (
    <Card style={styles.card}>
      <Card.Title title={name} subtitle={role} left={LeftContent} />
      <Card.Content>
        <StarRating rating={rating} />
        <Text style={styles.review}>"{review}"</Text>
      </Card.Content>
    </Card>
  );
};

export default Testimonial;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 6,
    height: 220,
    overflow: "hidden",
    backgroundColor: "#f0efed"
  },
  review: {
    fontSize: 16,
    color: "#444",
    fontStyle: "italic",
    marginTop: 8,
    lineHeight: 22,
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  star: {
    fontSize: 18,
    marginRight: 4,
  },
  starFilled: {
    color: "#FFD700",
  },
  starEmpty: {
    color: "#ddd",
  },
});
