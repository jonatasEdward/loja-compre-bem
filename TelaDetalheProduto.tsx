import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './App';
import type { Produto } from './TelaListaProdutos';

// DetalheProduto é o mesmo componente construído na Aula 04, só lê o que
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

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'> & {
  produtos: Produto[];
};

// Categoria 4 (navegação segura), acesso opcional a route.params: se a tela
// for aberta sem produtoId (ex.: link direto, ou navegação disparada sem
// parâmetro por engano), a tela mostra um estado tratável em vez de quebrar.
function TelaDetalheProduto({ route, navigation, produtos }: Props) {
  const produtoId = route.params?.produtoId;
  const produto = produtos.find((item) => item.id === produtoId);

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.nome}>Produto não encontrado.</Text>
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <DetalheProduto produto={produto} />;
}

export default TelaDetalheProduto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  // Aula 13: largura relativa (100%) já existia desde a Aula 04, mas a
  // altura era fixa em pixels (220), então num tablet bem mais largo que um
  // celular a imagem esticava sem crescer na mesma proporção. aspectRatio
  // mantém a proporção largura/altura e deixa a largura relativa decidir o
  // tamanho real (reactnative.dev/docs/flexbox).
  imagem: {
    width: '100%',
    aspectRatio: 4 / 3,
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
  voltar: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 16, alignSelf: 'flex-start' },
  voltarTexto: { color: '#1B3A5C', fontWeight: 'bold' },
});
