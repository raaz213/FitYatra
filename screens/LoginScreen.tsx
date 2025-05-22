// components/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface LoginScreenProps {
  onSwitchToSignUp: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen: React.FC<LoginScreenProps> = ({ onSwitchToSignUp }) => {
  const handleLogin = (values: LoginFormValues) => {
    console.log('Login:', values);
    Alert.alert('Success', 'Login successful!');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality would go here');
  };

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        
          <View style={styles.overlay}>
            <View style={styles.card}>
              <Text style={styles.title}>Log In</Text>
              <Text style={styles.subtitle}>
                The lower abdomen and hips are the most difficult areas of the body to reduce when...
              </Text>
              
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginValidationSchema}
                onSubmit={handleLogin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
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

                    <TouchableOpacity
                      style={styles.forgotPassword}
                      onPress={handleForgotPassword}
                    >
                      <Text style={styles.forgotPasswordText}>
                        Forgot your Password?
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.signUpLink}
                      onPress={onSwitchToSignUp}
                    >
                      <Text style={styles.signUpLinkText}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
       
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  content: {
    // minHeight: 700,
    justifyContent: 'center',
    opacity: 0.8,
    marginTop: 120,
  },
 
  overlay: {
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    margin: 10,
    // borderRadius: 10,
  },
  card: {
    backgroundColor: 'white',
    margin: 20,
    padding: 25,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: 'teal',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpLink: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  signUpLinkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;