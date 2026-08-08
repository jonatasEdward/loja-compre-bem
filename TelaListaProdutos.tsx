import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './App';

export type Produto = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: number;
};

export const produtosMock: Produto[] = [
  {
    id: 1,
    nome: 'Cadeira Confort Plus',
    preco: 'R$ 349,90',
    descricao: 'Cadeira ergonômica estofada, ideal para home office. Estrutura reforçada e altura regulável.',
    imagem: require('./assets/produto-cadeira.png'),
  },
  {
    id: 2,
    nome: 'Mesa Escritório Slim',
    preco: 'R$ 459,00',
    descricao: 'Mesa compacta com acabamento em MDF, ideal para espaços pequenos.',
    imagem: require('./assets/produto-mesa.png'),
  },
  {
    id: 3,
    nome: 'Luminária de Mesa LED',
    preco: 'R$ 89,90',
    descricao: 'Luminária com 3 níveis de intensidade e braço flexível.',
    imagem: require('./assets/produto-luminaria.png'),
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'ListaProdutos'>;

function TelaListaProdutos({ navigation }: Props) {
  return (
    <FlatList
      data={produtosMock}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('DetalheProduto', { produtoId: item.id })}
        >
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.preco}>{item.preco}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  nome: { fontSize: 16, fontWeight: '600' },
  preco: { fontSize: 14, color: '#2E7D32' },
});

export default TelaListaProdutos;
