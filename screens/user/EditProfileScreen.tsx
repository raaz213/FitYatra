import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { Toast } from "toastify-react-native";
import { UpdateUserReq, User } from "../../types/auth/auth";
import { getUser, updateUser } from "../../services/auth/auth";
import { useNavigation } from "expo-router";

// Validation schema with optional fields
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

  const getUserData = async () => {
    const response = await getUser();
    setUser(response);
  };

  useEffect(() => {
    getUserData();
  }, []);

const navigation = useNavigation();


  const handleEdit = async (values: UpdateUserReq) => {
    try {
      await updateUser(values);
      Toast.success("Edited successfully");
      navigation.goBack();
    } catch (e: any) {
      console.error(e);
      Toast.error(e?.response?.data?.message || "Error updating profile");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Edit Profile</Text>

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
              <TextInput
                style={[
                  styles.input,
                  touched.name && errors.name && styles.inputError,
                ]}
                placeholder="Name"
                placeholderTextColor="#999"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              {/* Age */}
              <TextInput
                style={[
                  styles.input,
                  touched.age && errors.age && styles.inputError,
                ]}
                placeholder="Age"
                placeholderTextColor="#999"
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

              {/* Weight */}
              <TextInput
                style={[
                  styles.input,
                  touched.weight && errors.weight && styles.inputError,
                ]}
                placeholder="Weight (kg)"
                placeholderTextColor="#999"
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

              {/* Height */}
              <TextInput
                style={[
                  styles.input,
                  touched.height && errors.height && styles.inputError,
                ]}
                placeholder="Height (cm)"
                placeholderTextColor="#999"
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

              {/* Gender Picker */}
              <Picker
                selectedValue={values.gender}
                onValueChange={(itemValue) => setFieldValue("gender", itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>

              {/* Email */}
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError,
                ]}
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Password */}
              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password && styles.inputError,
                ]}
                placeholder="Password"
                placeholderTextColor="#999"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.signUpButtonText}>Save Changes</Text>
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
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 12,
  },
  signUpButton: {
    backgroundColor: "#06407a",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  signUpButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#eee",
    marginBottom: 12,
    borderRadius: 8,
  },
});
