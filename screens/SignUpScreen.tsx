// components/SignUpScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface SignUpScreenProps {
  onSwitchToLogin: () => void;
}

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  dob: string;
  weight: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  dob: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in DD/MM/YYYY format')
    .required('Date of birth is required'),
  weight: Yup.number()
    .positive('Weight must be a positive number')
    .required('Weight is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSwitchToLogin }) => {
  const handleSignUp = (values: SignUpFormValues) => {
    console.log('Sign up:', values);
    Alert.alert('Success', 'Account created successfully!');
  };

  const formatDate = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Add slashes after day and month
    if (cleaned.length >= 3 && cleaned.length <= 4) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    } else if (cleaned.length >= 5) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }
    return cleaned;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          The lower abdomen and hips are the most difficult areas of the body to reduce when...
        </Text>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            dob: '',
            weight: '',
            email: '',
            password: '',
            confirmPassword: '',
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
                  touched.firstName && errors.firstName && styles.inputError,
                ]}
                placeholder="First name"
                placeholderTextColor="#999"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.lastName && errors.lastName && styles.inputError,
                ]}
                placeholder="Last name"
                placeholderTextColor="#999"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.dob && errors.dob && styles.inputError,
                ]}
                placeholder="DOB (DD/MM/YYYY)"
                placeholderTextColor="#999"
                value={values.dob}
                onChangeText={(text) => {
                  const formatted = formatDate(text);
                  setFieldValue('dob', formatted);
                }}
                onBlur={handleBlur('dob')}
                keyboardType="numeric"
                maxLength={10}
              />
              {touched.dob && errors.dob && (
                <Text style={styles.errorText}>{errors.dob}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.weight && errors.weight && styles.inputError,
                ]}
                placeholder="Weight (kg)"
                placeholderTextColor="#999"
                value={values.weight}
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                keyboardType="numeric"
              />
              {touched.weight && errors.weight && (
                <Text style={styles.errorText}>{errors.weight}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError,
                ]}
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
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
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.confirmPassword && errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={()=>handleSubmit()}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.loginPrompt}>
                <Text style={styles.loginPromptText}>
                  If you have already an account{' '}
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 5,
  },
  signUpButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginPrompt: {
    alignItems: 'center',
  },
  loginPromptText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;