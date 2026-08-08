import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

type Produto = {
  id: string;
  nome: string;
  preco: string;
  imagem: number;
};

const produtosMock: Produto[] = [
  { id: '1', nome: 'Cadeira Confort Plus', preco: 'R$ 349,90', imagem: require('./assets/produto-cadeira.png') },
  { id: '2', nome: 'Mesa para Escritório Compacta', preco: 'R$ 589,00', imagem: require('./assets/produto-mesa.png') },
  { id: '3', nome: 'Luminária de Mesa LED', preco: 'R$ 79,90', imagem: require('./assets/produto-luminaria.png') },
  { id: '4', nome: 'Suporte para Notebook', preco: 'R$ 129,90', imagem: require('./assets/produto-suporte.png') },
];

// ProdutoItem só lê o que recebe via prop — não altera o produto (fluxo de dados unidirecional)
function ProdutoItem({ produto }: { produto: Produto }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <View style={styles.item}>
      <Image source={produto.imagem} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
      </View>
      <Button
        title={favorito ? '♥' : '♡'}
        onPress={() => setFavorito(!favorito)}
      />
    </View>
  );
}

function TelaListaProdutos() {
  return (
    <View style={styles.container}>
      {produtosMock.map((produto) => (
        <ProdutoItem key={produto.id} produto={produto} />
      ))}
    </View>
  );
}

export default function App() {
  return (
    <>
      <TelaListaProdutos />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  imagem: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  preco: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 4,
  },
});
