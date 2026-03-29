import {View, Text, Image, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router';
import { defaultPizzaImg } from '@/app/components/ProductListItem';
import { useState } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { PizzaSize } from '@/app/types';
import { SymbolView } from 'expo-symbols';
import Colors from 'constants/Colors';
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
            {/* Dynamic Route Screen */}
            <Stack.Screen 
                options={{ 
                    title: 'Details',
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable style={{ marginRight: 15 }}>
                                {({ pressed }) => (
                                    <SymbolView
                                        name={{ ios: 'pencil', android: 'edit', web: 'edit' }}
                                        size={25}
                                        tintColor={Colors.light.tint}
                                        style={{ opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )
                }} 
            />

            <Stack.Screen options={{ title: product?.name }} />
  
            <Image 
                source={{ uri: product.image || defaultPizzaImg }} 
                style={styles.img} 
            />

            <Text style={styles.title}>${product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
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

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProductDetailsScreen;