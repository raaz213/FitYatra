import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback,  useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import { getUser, updateUserImage } from "../../../services/auth/auth";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { CLOUD_NAME, UPLOAD_PRESET } from "../../../constants/cloudinary";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState<{ name: string; email: string , image: string}>({
    name: "",
    email: "",
    image : "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<'idle'|'uploading'|'uploaded'>('idle');
  
  // Flat design cartoon avatars
  const cartoonAvatars = [
    "https://api.dicebear.com/7.x/avataaars/png?seed=Felix&backgroundColor=b6e3f4&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Aneka&backgroundColor=c0aede&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Bob&backgroundColor=d1d4f9&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Maria&backgroundColor=fecaca&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=John&backgroundColor=fed7aa&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Sarah&backgroundColor=86efac&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Mike&backgroundColor=fde68a&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Emma&backgroundColor=f9a8d4&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=David&backgroundColor=a7f3d0&size=150",
    "https://api.dicebear.com/7.x/avataaars/png?seed=Lisa&backgroundColor=ddd6fe&size=150"
  ];
  
  const getUserData = async () => {
    const response = await getUser();
    setUser({
      name: response.name,
      email: response.email,
      image: response.image ?? "",
    });
  };

  useFocusEffect(
    useCallback(() => {
      setLoadingStatus("idle");
      getUserData();
    }, [])
  );

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      setLoadingStatus('idle'); // Reset status when new image is selected
    }

    setModalVisible(false);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      setLoadingStatus('idle'); // Reset status when new image is selected
    }

    setModalVisible(false);
  };

  const selectAvatar = async (avatarUrl: string) => {
    try {
      setLoadingStatus('uploading');
      setAvatarModalVisible(false);
      setModalVisible(false);
      
      // Update user image with selected avatar
      await updateUserImage(avatarUrl);
      
      // Update user state with new image
      setUser(prev => ({ ...prev, image: avatarUrl }));
      setProfileImage(null); // Clear any selected image
      setLoadingStatus('uploaded');
      
      Toast.success("Avatar updated successfully");
      
      // Reset status after showing success message for 3 seconds
      setTimeout(() => {
        setLoadingStatus('idle');
      }, 3000);
      
    } catch (error: any) {
      console.log("Avatar update error:", error.message);
      setLoadingStatus('idle');
      Toast.error("Failed to update avatar");
    }
  };
 
  const handleFileUpload = async () => {
    if (!profileImage) {
      Alert.alert("No image selected", "Please select or take a photo.");
      return;
    }

    const formData = new FormData();

    const fileName = profileImage.split("/").pop() || "photo.jpg";
    const fileType = fileName.split(".").pop();

    formData.append("file", {
      uri: profileImage,
      name: fileName,
      type: `image/${fileType}`,
    } as any);

    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setLoadingStatus('uploading');
      
      // 1. Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 2. Get the uploaded image URL
      const imageUrl = response.data.secure_url;

      if (imageUrl) {
        // 3. Send to backend
        await updateUserImage(imageUrl);
        
        // Update user state with new image
        setUser(prev => ({ ...prev, image: imageUrl }));
        setProfileImage(null); // Clear the selected image since it's now saved
        setLoadingStatus('uploaded');
        
        Toast.success("Profile uploaded successfully");
        
        // Reset status after showing success message for 3 seconds
        setTimeout(() => {
          setLoadingStatus('idle');
        }, 3000);
        
      } else {
        setLoadingStatus('idle');
        Toast.error("Failed to upload to Cloudinary");
      }
    } catch (error: any) {
      console.log("Upload error:", error.message);
      setLoadingStatus('idle');
      Toast.error("Upload failed");
    }
  };

  // Determine which image to show
  const getImageUri = () => {
    if (profileImage) return profileImage; // Show selected image
    if (user.image) return user.image; // Show user's current image
    return cartoonAvatars[0]; // Default to first cartoon avatar
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerCard}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {loadingStatus === 'uploading' ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#06407a" />
              <Text style={styles.loadingText}>Uploading...</Text>
            </View>
          ) : (
            <Avatar.Image
              size={90}
              source={{ uri: getImageUri() }}
              style={styles.avatar}
            />
          )}
        </TouchableOpacity>

        {/* Status Messages */}
        {loadingStatus === 'uploaded' && (
          <Text style={styles.successText}>Uploaded successfully!</Text>
        )}

        {/* Save Button - only show when image is selected and not uploading */}
        {profileImage && loadingStatus !== 'uploading' && (
          <TouchableOpacity onPress={handleFileUpload} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Profile Photo Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Profile photo</Text>

            <View style={styles.modalOptions}>
              <TouchableOpacity style={styles.option} onPress={takePhoto}>
                <Ionicons name="camera" size={28} color="#06407a" />
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} onPress={pickImageFromLibrary}>
                <Ionicons name="image" size={28} color="#06407a" />
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} onPress={() => {
                setModalVisible(false);
                setAvatarModalVisible(true);
              }}>
                <Ionicons name="person-circle" size={28} color="#06407a" />
                <Text style={styles.optionText}>Avatar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={{ color: "#dc2626", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cartoon Avatar Selection Modal */}
      <Modal visible={avatarModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.avatarModalContainer}>
            <Text style={styles.modalTitle}>Choose Avatar</Text>
            <Text style={styles.modalSubtitle}>Swipe horizontally to see all avatars</Text>
            
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.avatarScrollContainer}
              style={styles.avatarScrollView}
            >
              {cartoonAvatars.map((avatarUrl, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.avatarOption}
                  onPress={() => selectAvatar(avatarUrl)}
                >
                  <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              onPress={() => setAvatarModalVisible(false)} 
              style={styles.cancelButton}
            >
              <Text style={{ color: "#dc2626", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 18,
    alignItems: "center",
  },
  headerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  avatar: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  loadingContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  loadingText: {
    fontSize: 10,
    color: "#06407a",
    marginTop: 5,
    fontWeight: "500",
  },
  successText: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#06407a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatarModalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    color: "#1e293b",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  option: {
    alignItems: "center",
  },
  optionText: {
    marginTop: 4,
    fontSize: 14,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 16,
  },
  avatarScrollView: {
    maxHeight: 120,
  },
  avatarScrollContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  avatarOption: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 4,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
});