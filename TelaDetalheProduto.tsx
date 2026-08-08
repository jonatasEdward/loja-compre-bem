import { View, Text, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './App';
import { produtosMock, type Produto } from './TelaListaProdutos';

// DetalheProduto é o mesmo componente construído na Aula 04 — só lê o que
// recebe via prop, nunca altera (props somente-leitura, Aula 03).
function DetalheProduto({ produto }: { produto: Produto }) {
  return (
    <View style={styles.container}>
      <Image source={produto.imagem} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>
      <Text style={styles.descricao}>{produto.descricao}</Text>
    </View>
  );
}

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'>;

function TelaDetalheProduto({ route }: Props) {
  const { produtoId } = route.params;
  const produto = produtosMock.find((item) => item.id === produtoId)!;

  return <DetalheProduto produto={produto} />;
}

export default TelaDetalheProduto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  imagem: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  preco: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 4,
  },
  descricao: {
    fontSize: 15,
    color: '#4A4A4A',
    marginTop: 12,
    lineHeight: 22,
  },
});
