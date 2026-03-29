import { router } from "expo-router";
import { useEffect } from "react";

export default function TabIndex() {
    useEffect(() => {
        router.replace('/(admin)/menu/');
    }, []);

    return null;
}