import { View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import Button from "@/components/ui/button";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function HomeScreen() {
    const { signOut } = useClerk();
    
    const handleSignOut = async () => {
        await signOut();
        router.replace("/(auth)");
      };
      
    return (
        <BodyScrollView contentContainerStyle={{ padding: 16 }}>
            <ThemedText type='title'>Home</ThemedText>
            <Button onPress={handleSignOut}>Sign Out</Button>
        </BodyScrollView>
    )
}