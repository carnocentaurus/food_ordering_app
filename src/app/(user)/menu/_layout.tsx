import { Stack, Link } from "expo-router";
import { Pressable } from 'react-native';
import Colors from "@/app/constants/Colors";
import { SymbolView } from "expo-symbols";

export default function MenuStack() {
    return(
        <Stack screenOptions={{
            headerRight: () => (
                        <Link href="/cart" asChild>
                          <Pressable style={{ marginRight: 15 }}>
                            {({ pressed }) => (
                              <SymbolView
                                name={{ ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' }}
                                size={25}
                                tintColor={Colors.light.tint}
                                style={{ opacity: pressed ? 0.5 : 1 }}
                              />
                            )}
                          </Pressable>
                        </Link>
                      ),
        }}>
            <Stack.Screen name='index' options={{title: 'Menu'}} />
        </Stack>
    );
}