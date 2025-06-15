// components/SignUpScreen.tsx
import React from "react";
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
import { User } from "../types/auth/auth";
import { Picker } from "@react-native-picker/picker";
import { register } from "../services/auth/auth";
import { Toast } from "toastify-react-native";

interface SignUpScreenProps {
  onSwitchToLogin: () => void;
  setUserData:(data:User) => void;
}

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .required("Age is required"),
  weight: Yup.number()
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  height: Yup.number()
    .positive("Height must be a positive number")
    .required("Height is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSwitchToLogin, setUserData }) => {

  const handleSignUp = async (values: User) => {

    try {
     const response = await register(values);
     setUserData(response);
      Toast.success("Registered successfully");
      onSwitchToLogin();
    } catch (e: any) {
      console.error(e);
      Toast.error(
        e?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          The lower abdomen and hips are the most difficult areas of the body to
          reduce when...
        </Text>

        <Formik
          initialValues={{
            name: "",
            age: 0,
            weight: 0,
            height: 0,
            gender: "male",
            email: "",
            password: "",
            role:'user'
          }}
          validationSchema={SignUpValidationSchema}
          onSubmit={handleSignUp}
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

              <TextInput
                style={[
                  styles.input,
                  touched.age && errors.age && styles.inputError,
                ]}
                placeholder="Age"
                placeholderTextColor="#999"
                value={values.age === 0 ? "" : values.age.toString()}
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

              <TextInput
                style={[
                  styles.input,
                  touched.weight && errors.weight && styles.inputError,
                ]}
                placeholder="Weight (kg)"
                placeholderTextColor="#999"
                value={values.weight === 0 ? "" : values.weight.toString()}
                onChangeText={(text) =>
                  setFieldValue("weight", text === "" ? 0 : parseFloat(text) || 0)
                }
                onBlur={handleBlur("weight")}
                keyboardType="numeric"
              />
              {touched.weight && errors.weight && (
                <Text style={styles.errorText}>{errors.weight}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.height && errors.height && styles.inputError,
                ]}
                placeholder="Height (cm)"
                placeholderTextColor="#999"
                value={values.height === 0 ? "" : values.height.toString()}
                onChangeText={(text) =>
                  setFieldValue("height", text === "" ? 0 : parseFloat(text) || 0)
                }
                onBlur={handleBlur("height")}
                keyboardType="numeric"
              />
              {touched.height && errors.height && (
                <Text style={styles.errorText}>{errors.height}</Text>
              )}

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

              <Picker
                selectedValue={values.gender}
                onValueChange={(itemValue) => setFieldValue("gender", itemValue)}
                style={[
                  styles.input,
                  touched.gender && errors.gender && styles.inputError,
                ]}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
              {touched.gender && errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.loginPrompt}>
                <Text style={styles.loginPromptText}>
                  Already have an account?{" "}
                  <Text style={styles.loginLink} onPress={onSwitchToLogin}>
                    Log in
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    opacity: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  inputError: {
    borderColor: "#ff6b6b",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 5,
  },
  signUpButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginPrompt: {
    alignItems: "center",
  },
  loginPromptText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
