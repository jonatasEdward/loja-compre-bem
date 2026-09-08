import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './App';
import type { Produto } from './TelaListaProdutos';

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

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheProduto'> & {
  produtos: Produto[];
};

// Categoria 4 (navegação segura) — acesso opcional a route.params: se a tela
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
    flex: 1, // ocupa toda a área disponível da tela
    padding: 20, // espaço interno entre o conteúdo e as bordas da tela
    backgroundColor: '#FFFFFF', // fundo branco da tela
  },
  imagem: {
    width: '100%', // a imagem ocupa toda a largura do container
    height: 220, // altura fixa da imagem em pixels
    borderRadius: 8, // arredonda os cantos da imagem
    marginBottom: 16, // espaço entre a imagem e o texto abaixo
  },
  nome: {
    fontSize: 22, // tamanho da fonte do nome do produto
    fontWeight: 'bold', // deixa o nome em negrito
    color: '#1B3A5C', // azul-escuro do título
  },
  preco: {
    fontSize: 20, // tamanho da fonte do preço
    fontWeight: '600', // deixa o preço semi-negrito
    color: '#2E7D32', // verde para destacar o valor
    marginTop: 4, // pequeno espaço entre o nome e o preço
  },
  descricao: {
    fontSize: 15, // tamanho da fonte do texto de descrição
    color: '#4A4A4A', // cinza-escuro para leitura confortável
    marginTop: 12, // espaço entre o preço e a descrição
    lineHeight: 22, // altura de cada linha (espaçamento entre linhas)
  },
  voltar: {
    marginTop: 20, // espaço acima do botão voltar
    paddingVertical: 12, // espaço interno em cima e embaixo do texto
    paddingHorizontal: 16, // espaço interno nas laterais do texto
    alignSelf: 'flex-start', // o botão ocupa só a largura do seu texto, alinhado à esquerda
  },
  voltarTexto: {
    color: '#1B3A5C', // azul-escuro do texto do botão
    fontWeight: 'bold', // deixa o texto em negrito
  },
});
