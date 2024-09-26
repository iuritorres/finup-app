import { Text, View } from 'react-native';
import { AppStyles } from '../AppStyles';

export default function Home() {
  return (
    <View style={[AppStyles.backgroundDark, AppStyles.container]}>
      <Text style={{ color: '#fff' }}>Home</Text>
    </View>
  );
}
