import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TelaListaProdutos from './TelaListaProdutos';
import TelaDetalheProduto from './TelaDetalheProduto';

export type RootStackParamList = {
  ListaProdutos: undefined;
  DetalheProduto: { produtoId: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// SafeAreaProvider entra uma única vez, na raiz — é o que permite o
// SafeAreaView de react-native-safe-area-context (usado em TelaListaProdutos)
// funcionar em qualquer tela abaixo dele. Aula 08.
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListaProdutos">
          <Stack.Screen name="ListaProdutos" component={TelaListaProdutos} />
          <Stack.Screen name="DetalheProduto" component={TelaDetalheProduto} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
