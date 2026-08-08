# Notas para aula — StyleSheet (Aulas 03 e 04)

Explicação de apoio para ensinar os estilos usados no `App.tsx` deste projeto (loja-exemplo). Não é material do aluno — é referência do professor.

## Como funciona `StyleSheet.create()` (a diferença que importa para a turma)

React Native **não usa CSS** — usa um objeto JS com propriedades em `camelCase` (não `background-color`, e sim `backgroundColor`). `StyleSheet.create()` não faz nada "mágico": é basicamente um objeto de estilos com validação e otimização de performance (o RN converte os estilos num id numérico internamente). O ganho pedagógico de usá-lo em vez de `style={{ ... }}` inline é separar **estrutura** (JSX) de **aparência** (objeto `styles`), igual à separação HTML/CSS — só que no mesmo arquivo.

Três diferenças que costumam confundir quem vem da web:

- **Não existe cascata nem seletor.** Cada `View`/`Text`/`Image` só recebe o que está explicitamente no `style={styles.algumaCoisa}`. Não há herança automática de estilo de pai para filho (exceto texto dentro de texto).
- **`flexDirection` padrão é `column`**, não `row` como na web. É por isso que empilhar elementos verticalmente (Passo 1 do `codigo-aula.md` da Aula 04) não precisa de nenhum estilo — já é o comportamento default do `View`.
- **Números sem unidade** = pixels de densidade independente (dp), não `px` de CSS. Não existe `%` em toda propriedade — funciona em `width`/`height`, mas não em `fontSize`, por exemplo.

## Aula 03 — estilos da lista de produtos

```js
container: { flex: 1, padding: 16, backgroundColor: '#FFFFFF' }
```
`flex: 1` faz o `View` ocupar todo o espaço disponível da tela — é o equivalente a "essa é a raiz visual, preencha a tela toda". `padding: 16` afasta o conteúdo das bordas da tela.

```js
item: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }
```
Aqui `flexDirection: 'row'` é o primeiro contraste com o padrão `column` — imagem, texto e botão ficam lado a lado. `alignItems: 'center'` centraliza verticalmente esses itens dentro da linha (eixo cruzado do flex). `borderBottomWidth`/`borderBottomColor` desenham a linha divisória entre produtos — no RN a borda é sempre dividida em propriedades separadas (`borderBottomWidth`, `borderTopColor` etc.), não existe atalho tipo `border-bottom: 1px solid #ccc`.

```js
imagem: { width: 64, height: 64, borderRadius: 8, marginRight: 12 }
```
Tamanho fixo em dp + `borderRadius` para cantos arredondados — igual à web.

```js
nome: { fontSize: 16, fontWeight: 'bold', color: '#1B3A5C' }
preco: { fontSize: 15, fontWeight: '600', color: '#2E7D32', marginTop: 4 }
```
`fontWeight` aceita string (`'bold'`, `'600'`). A cor verde do preço é intencional — associação visual comum em apps de compra.

## Aula 04 — estilos novos da tela de detalhe

Mesmo vocabulário de propriedades, aplicado a uma tela cheia (um produto só, não uma lista):

```js
detalheContainer: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' }
```
Igual ao `container` da lista, só que sem `flexDirection: row` em nenhum filho — aqui os elementos ficam empilhados (padrão `column`) porque é uma ficha de produto, não uma linha de lista.

```js
detalheImagem: { width: '100%', height: 220, borderRadius: 8, marginBottom: 16 }
```
Ponto mais rico para discutir com a turma: `width: '100%'` (porcentagem funciona, herda a largura do pai) combinado com `height: 220` (fixo, em dp) — diferente da miniatura 64×64 da lista. Bom exemplo para explicar que imagem não tem "aspect ratio automático" no RN a menos que você configure isso explicitamente; aqui a altura foi fixada à mão.

```js
detalheDescricao: { fontSize: 15, color: '#4A4A4A', marginTop: 12, lineHeight: 22 }
```
`lineHeight` é a única propriedade que não aparece na Aula 03 — vale parar aqui, porque texto de descrição (multi-linha) precisa de espaçamento entre linhas para não ficar "grudado"; título e preço (uma linha só) não precisam.

**Gancho pedagógico**: `detalheNome`/`detalhePreco` são idênticos a `nome`/`preco` da lista (mesmo `fontSize`, `fontWeight`, `color`) — dá pra perguntar à turma "por que os valores são iguais?" e usar a resposta para plantar a ideia de reuso de estilo, que o projeto ainda não faz (cada tela tem seu próprio objeto `styles`), mas que é natural perguntarem sobre.

## Estado atual do `App.tsx` neste projeto

`TelaListaProdutos`/`ProdutoItem` (Aula 03) e `DetalheProduto`/`TelaDetalheProduto` (Aula 04) estão os dois definidos no arquivo. `App()` está rodando `TelaDetalheProduto` porque ainda não existe navegação entre telas — isso é conteúdo da Aula 05, que vai ligar lista → detalhe.
