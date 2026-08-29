import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './App';

export type Produto = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: number;
};

export const produtosIniciais: Produto[] = [
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

type Props = NativeStackScreenProps<RootStackParamList, 'ListaProdutos'> & {
  produtos: Produto[];
  onAdicionarProduto: (produto: Produto) => void;
};

function TelaListaProdutos({ navigation, produtos, onAdicionarProduto }: Props) {
  // Categoria 1 (área/dimensão), a loja vira 2 colunas sozinha num aparelho
  // largo (tablet, ou celular grande deitado); no celular comum, 1 coluna.
  // useWindowDimensions() atualiza esse valor automaticamente se o aparelho girar.
  const { width } = useWindowDimensions();
  const numColunas = width >= 600 ? 2 : 1;

  // Categoria 3 (teclado cobrindo campo), busca por nome do produto.
  const [busca, setBusca] = useState('');
  const produtosFiltrados = useMemo(
    () => produtos.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase())),
    [produtos, busca]
  );

  // Aula 11, cadastro de produto: dois campos controlados (nome, preço) e
  // uma validação que roda só ao tocar em "Cadastrar" (ou ao confirmar o
  // último campo pelo teclado), nunca a cada tecla digitada.
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [erro, setErro] = useState('');
  const inputPrecoRef = useRef<TextInput>(null);

  // Categoria 4 (navegação por plataforma), Aula 08: um único toque no
  // botão/gesto de voltar nesta tela (a raiz da pilha) fecharia o app direto;
  // "toque de novo para sair" evita saída acidental. No iOS o gesto nativo de
  // voltar não passa por aqui e não pode ser bloqueado, por isso este
  // BackHandler só faz sentido, e só dispara, no Android.
  const tocouVoltarUmaVez = useRef(false);
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const assinatura = BackHandler.addEventListener('hardwareBackPress', () => {
      if (tocouVoltarUmaVez.current) {
        return false; // segundo toque: deixa o Android fechar o app normalmente
      }
      tocouVoltarUmaVez.current = true;
      ToastAndroid.show('Toque voltar de novo para sair', ToastAndroid.SHORT);
      setTimeout(() => {
        tocouVoltarUmaVez.current = false;
      }, 2000);
      return true; // primeiro toque: bloqueia a saída imediata
    });
    return () => assinatura.remove();
  }, []);

  function validarESalvar() {
    if (nome.trim() === '') {
      setErro('O nome não pode ficar vazio.');
      return;
    }
    // TextInput.keyboardType="decimal-pad" é o valor certo para preço, a
    // documentação oficial não distingue "numeric" de "decimal-pad" por
    // acaso: "numeric"/"number-pad" só entregam dígitos inteiros, e é
    // "decimal-pad" quem inclui o separador decimal do idioma do aparelho
    // (reactnative.dev/docs/textinput). No Brasil isso normalmente é vírgula,
    // não ponto, por isso o preço digitado é normalizado antes de virar
    // número, sem depender de o usuário saber que o JavaScript só entende
    // ponto.
    const precoNormalizado = preco.trim().replace(',', '.');
    const precoNumerico = Number(precoNormalizado);
    if (preco.trim() === '' || isNaN(precoNumerico) || precoNumerico <= 0) {
      setErro('O preço precisa ser um número maior que zero (ex.: 89,90).');
      return;
    }

    // Placeholder: cadastro por texto não inclui upload de imagem, usamos
    // um ícone genérico já existente nos assets da loja.
    onAdicionarProduto({
      id: Date.now(),
      nome,
      preco: `R$ ${precoNumerico.toFixed(2).replace('.', ',')}`,
      descricao: 'Produto cadastrado pela equipe da loja.',
      imagem: require('./assets/produto-suporte.png'),
    });
    setNome('');
    setPreco('');
    setErro('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.area} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.area}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.cadastro}>
          <TextInput
            placeholder="Nome do novo produto"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => inputPrecoRef.current?.focus()}
          />
          <TextInput
            ref={inputPrecoRef}
            placeholder="Preço (ex.: 89,90)"
            value={preco}
            onChangeText={setPreco}
            style={styles.input}
            keyboardType="decimal-pad"
            returnKeyType="done"
            onSubmitEditing={validarESalvar}
          />
          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
          <TouchableOpacity style={styles.botaoCadastrar} onPress={validarESalvar}>
            <Text style={styles.botaoCadastrarTexto}>Cadastrar produto</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Buscar produto..."
          value={busca}
          onChangeText={setBusca}
          style={styles.busca}
        />
        <FlatList
          key={numColunas}
          data={produtosFiltrados}
          numColumns={numColunas}
          columnWrapperStyle={numColunas > 1 ? styles.linha : undefined}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1 },
  cadastro: { margin: 16, marginBottom: 0, gap: 8 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  erro: { color: '#C62828' },
  // Aula 13: com padding:12 e o texto de 14-16px, esse botão media perto de
  // 40px de altura, abaixo do minimo de 44x44 pixels CSS do criterio de
  // sucesso 2.5.5 (Target Size) da WCAG 2.1 (w3.org/WAI/WCAG21/Understanding/target-size.html).
  // minHeight:44 fecha essa lacuna sem depender do tamanho exato da fonte.
  botaoCadastrar: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCadastrarTexto: { color: '#FFFFFF', fontWeight: '600' },
  busca: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  linha: { justifyContent: 'space-between', paddingHorizontal: 16 },
  item: { flex: 1, padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  nome: { fontSize: 16, fontWeight: '600' },
  preco: { fontSize: 14, color: '#2E7D32' },
});

export default TelaListaProdutos;
