import { Stack, Link } from "expo-router";
import { Pressable } from 'react-native';
import Colors from "@/app/constants/Colors";
import { SymbolView } from "expo-symbols";

export default function MenuStack() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <Link href="/cart" asChild>
                    <Pressable style={{ marginRight: 15 }}>
                        {({ pressed }) => (
                            <SymbolView
                                name={{ ios: 'plus.square', android: 'add_box', web: 'add_box' }}
                                size={25}
                                tintColor={Colors.light.tint}
                                style={{ opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>
            ),
        }}>
            <Stack.Screen name='index' options={{ title: 'Menu' }} />

            {/* New Dynamic Route Screen */}
            <Stack.Screen 
                name='[id]' 
                options={{ 
                    title: 'Details',
                    headerRight: () => (
                        <Link href="/" asChild>
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
        </Stack>
    );
}