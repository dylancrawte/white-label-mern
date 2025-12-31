import { View } from "react-native";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";

import { ThemedText } from "@/components/themed-text";
import * as React from "react";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ClerkAPIError } from "@clerk/types";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [isSigningIn, setIsSigningIn] = React.useState(false)
    const [errors, setErrors] = React.useState<ClerkAPIError[]>([])

    const handleSignIn = React.useCallback(async () => {
        if (!isLoaded) return;
        setIsSigningIn(true);
        setErrors([]);
    
        try {
          const signInAttempt = await signIn.create({
            identifier: emailAddress,
            password,
          });
    
          if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            router.replace("/(index)");
          } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
          }
        } catch (err) {
          if (isClerkAPIResponseError(err)) setErrors(err.errors);
          console.error(JSON.stringify(err, null, 2));
        } finally {
          setIsSigningIn(false);
        }
      }, [isLoaded, signIn, emailAddress, password, setActive]);


    return (
    <BodyScrollView
        contentContainerStyle={{
            padding: 16,
        }}
    >
        <TextInput 
            label="Email" 
            value={emailAddress}
            placeholder="Enter your email" 
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmailAddress}
        />
        <TextInput 
            label="Password " 
            value={password}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
        />
        <Button
            disabled = {!emailAddress || !password || isSigningIn}
            onPress={handleSignIn}
            loading={isSigningIn}
        >Sign In</Button>

        
        <View style={{
            marginTop: 16,
            alignItems: 'center',
        }}>
            <ThemedText>{`Don't have an account?`}</ThemedText>
            <Button 
            onPress={() => router.push('/sign-up')}
            variant="ghost"
            >Sign Up</Button>
        </View>

        <View style={{
            marginTop: 16,
            alignItems: 'center',
        }}>
            <ThemedText>Forgot your password?</ThemedText>
            <Button 
            onPress={() => router.push('/reset-password')}
            variant="ghost"
            >Reset Password</Button>
        </View>



    </BodyScrollView>
    )
}