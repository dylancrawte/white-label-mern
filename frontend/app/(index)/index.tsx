import { ThemedText } from "@/components/themed-text";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Link, useRouter } from "expo-router";

import Button from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";

export default function HomeScreen() {
    const router = useRouter();
    return (
        <BodyScrollView contentContainerStyle={{ marginTop: 50 }}>
        <Link href="/modal" asChild>
        <Button>
          Open modal
        </Button>
      </Link>
    <Button 
    onPress={() => {router.push('/modal')}}
    style={{backgroundColor: 'red'}}
    >
        Go to custom Modal
    </Button>

    <Collapsible title="Advanced settings">
        <ThemedText>• Enable notifications</ThemedText>
        <ThemedText>• Sync over Wi-Fi only</ThemedText>
        <ThemedText>• Debug mode</ThemedText>
    </Collapsible>
    
        </BodyScrollView>

    )
}