import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaListaProdutos from './TelaListaProdutos';
import TelaDetalheProduto from './TelaDetalheProduto';

export type RootStackParamList = {
  ListaProdutos: undefined;
  DetalheProduto: { produtoId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProdutos">
        <Stack.Screen name="ListaProdutos" component={TelaListaProdutos} />
        <Stack.Screen name="DetalheProduto" component={TelaDetalheProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
