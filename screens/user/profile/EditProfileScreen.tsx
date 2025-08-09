import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { UpdateUserReq, User } from "../../../types/auth/auth";
import { getUser, updateUser } from "../../../services/auth/auth";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 characters").optional(),
  age: Yup.number().positive("Age must be a positive number").optional(),
  weight: Yup.number().positive("Weight must be a positive number").optional(),
  height: Yup.number().positive("Height must be a positive number").optional(),
  email: Yup.string().email("Invalid email format").optional(),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .optional(),
});

const EditProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const navigation = useNavigation();

  const handleEdit = async (values: UpdateUserReq) => {
    try {
      await updateUser(values);
      Alert.alert("Profile updated successfully!");
      navigation.goBack();
    } catch (e: any) {
      console.error(e);
      Alert.alert(e?.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06407a" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorScreenText}>
          Failed to load user data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View style={styles.card}>
        <Formik
          enableReinitialize
          key={user.email}
          initialValues={{
            name: user.name,
            age: user.age,
            weight: user.weight,
            height: user.height,
            gender: user.gender,
            email: user.email,
            password: user.password,
          }}
          validationSchema={SignUpValidationSchema}
          onSubmit={handleEdit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View>
              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.name && errors.name && styles.inputError,
                  ]}
                  placeholder="Enter your name"
                  placeholderTextColor="#94A3B8"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Age */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.age && errors.age && styles.inputError,
                  ]}
                  placeholder="Enter your age"
                  placeholderTextColor="#94A3B8"
                  value={values.age ? values.age.toString() : ""}
                  onChangeText={(text) =>
                    setFieldValue("age", text === "" ? 0 : parseInt(text) || 0)
                  }
                  onBlur={handleBlur("age")}
                  keyboardType="numeric"
                  maxLength={2}
                />
                {touched.age && errors.age && (
                  <Text style={styles.errorText}>{errors.age}</Text>
                )}
              </View>

              {/* Weight */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.weight && errors.weight && styles.inputError,
                  ]}
                  placeholder="Enter your weight in kg"
                  placeholderTextColor="#94A3B8"
                  value={values.weight ? values.weight.toString() : ""}
                  onChangeText={(text) =>
                    setFieldValue(
                      "weight",
                      text === "" ? 0 : parseFloat(text) || 0
                    )
                  }
                  onBlur={handleBlur("weight")}
                  keyboardType="numeric"
                />
                {touched.weight && errors.weight && (
                  <Text style={styles.errorText}>{errors.weight}</Text>
                )}
              </View>

              {/* Height */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.height && errors.height && styles.inputError,
                  ]}
                  placeholder="Enter your height in cm"
                  placeholderTextColor="#94A3B8"
                  value={values.height ? values.height.toString() : ""}
                  onChangeText={(text) =>
                    setFieldValue(
                      "height",
                      text === "" ? 0 : parseFloat(text) || 0
                    )
                  }
                  onBlur={handleBlur("height")}
                  keyboardType="numeric"
                />
                {touched.height && errors.height && (
                  <Text style={styles.errorText}>{errors.height}</Text>
                )}
              </View>

              {/* Gender Picker */}
              <View>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.gender}
                    onValueChange={(itemValue) =>
                      setFieldValue("gender", itemValue)
                    }
                  >
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  placeholder="Enter new password (optional)"
                  placeholderTextColor="#94A3B8"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#F1F5F9",
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
  },
  errorScreenText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    

  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  errorText: {
    color: "#EF4444",
    marginTop: 6,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "500",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#06407a",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  saveButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
