import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import Button from '@/app/components/Button';
import { useState } from 'react';
import { defaultPizzaImg } from '@/app/components/ProductListItem';
import Colors from 'constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useInsertProduct } from '@/api/products';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

    const {mutate: insertProduct} = useInsertProduct();

    const resetFields = () => {
        setName('');
        setPrice('');
        setImage(null);
    }

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Product name is required!');
            return false;
        }
        if (!price) {
            setErrors('Price is required!');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number!');
            return false;
        }
        return true;
    }

    const onSubmit = () => {
        if (isUpdating) {
            // update
            onUpdateCreate();
        }
        else {
            onCreate();
        }
    }

    const onCreate = () => {
        if (!validateInput()) return;
        
        insertProduct({name, price: parseFloat(price), image});

        resetFields();
    }

    const onUpdateCreate = () => {
        if (!validateInput()) return;
        // save to db logic here
        resetFields();
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // only select images
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1, // 1 = full quality, 0.5 = half quality
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
            {
                text: 'Cancel'
            },

            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ]);
    }

    const confirmDelete = () => {

    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? 'Update Product' : 'Create Product'}} />

            <Image source={{ uri: image || defaultPizzaImg }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput 
                value={name}
                onChangeText={setName}
                placeholder='Margarita' 
                placeholderTextColor='#666'
                style={styles.input} 
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
                value={price}
                onChangeText={setPrice}
                placeholder='9.99' 
                placeholderTextColor='#666'
                style={styles.input}
                keyboardType='numeric'
            />

            {errors ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors}</Text> : null}
            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 100, // Optional: makes the pizza look circular
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    }
});

export default CreateProductScreen;