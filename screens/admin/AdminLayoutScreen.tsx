import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from '../../navigation/admin/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';


const AdminLayoutScreen = () => {
    return (
        <>
        <NavigationContainer>
            <DrawerNavigator /> 
        </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({})

export default AdminLayoutScreen;
