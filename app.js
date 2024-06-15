import { Stack } from 'expo-router';

export default function App() {
  return (
    <Stack>
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="(app)/_layout" component={AppLayout} />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack>
  );
}
