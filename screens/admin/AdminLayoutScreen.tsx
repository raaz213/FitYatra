import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from '../../navigation/admin/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ToastManager from 'toastify-react-native'

const AdminLayoutScreen = () => {
    return (
        <>
        <ToastManager />
        <NavigationContainer>
            <DrawerNavigator /> 
        </NavigationContainer>

        </>
    );
}

const styles = StyleSheet.create({})

export default AdminLayoutScreen;
