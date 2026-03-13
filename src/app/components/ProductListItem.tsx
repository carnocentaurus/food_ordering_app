import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Product } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20
  },

  image: {
    width: '100%',
    aspectRatio: 1
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },

  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  }
});

type ProductListItemProps = {
    product: Product;
}

export const defaultPizzaImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

const ProductListItem = ({product}: ProductListItemProps) => {
  return(
    <View style={styles.container}>
      <Image 
        source={{uri: product.image || defaultPizzaImg}} 
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

export default ProductListItem;