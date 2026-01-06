import { ThemedText } from "@/components/themed-text";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import BodyScrollView from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";

export default function SecondTab() {
    const router = useRouter();

    const { signOut } = useClerk();
    
    const handleSignOut = async () => {
        await signOut();
        router.replace("/(auth)");
      };
    
    return(
        <BodyScrollView contentContainerStyle={{ padding: 16 }}>
            
            <Button onPress={handleSignOut}>Sign Out</Button>

        </BodyScrollView>
    )
}