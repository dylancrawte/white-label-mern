import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons'; 

export default function HomeRoutesLayout() {
  
  return (
    <Tabs screenOptions={{
      ...(process.env.EXPO_OS !== "ios"
        ? {}
        : {
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: "systemChromeMaterial",
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: true,
            headerLargeStyle: {
              // NEW: Make the large title transparent to match the background.
              backgroundColor: "transparent",
            },
          }),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}/>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'} // Change icon based on focus
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
    )
}