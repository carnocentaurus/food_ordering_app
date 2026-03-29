import {View, Text, Image, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { defaultPizzaImg } from '@/app/components/ProductListItem';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { useCart } from '@/app/providers/CartProvider';
import { PizzaSize } from '@/app/types';
import { useProduct } from '@/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const {id: idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const {data: product, error, isLoading} = useProduct(id);

    const { addItem } = useCart();

    const router = useRouter();

    const addToCart = () => {
        if (!product) return;

        addItem(product, selectedSize);

        router.push('/cart');
    }

    if (isLoading) return <ActivityIndicator/>;

    if (error) return <Text>Failed to fetch products</Text>

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: product?.name }} />
  
            <Image 
                source={{ uri: product.image || defaultPizzaImg }} 
                style={styles.img} 
            />

            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable
                        key={size}
                        onPress={() => {
                            setSelectedSize(size);
                        }}
                        style={[
                            styles.size,
                            { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }
                        ]}
                    >
                        <Text
                            style={[
                                styles.sizeText,
                                { color: selectedSize === size ? 'black' : 'gray' }
                            ]}
                        >
                            {size}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.price}>${product.price}</Text>

            <Button onPress={addToCart} text='Add to Cart' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },

    img: {
        width: '100%',
        aspectRatio: 1,
        padding: 10
    },

    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 'auto'
    },
    
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },

    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        borderRadius: 25,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    sizeText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default ProductDetailsScreen;