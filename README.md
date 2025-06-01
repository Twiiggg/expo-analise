# Sugestões de Melhoria e Observações de Código

## ChatList.js
Exibe a lista de conversas disponíveis para o usuário atual. Cada item representa um contato com quem houve troca de mensagens e permite navegar para o chat correspondente.
O ChatList mostra as conversas com contatos que o user já teve troca de mensagens com, e deixa o user entrar nessas conversas

- ### Boas práticas
	- Uso de `FlatList` para renderizar listas de forma eficiente.
	- Separação do componente `ChatItem` para modularidade.

- ### Problemas e sugestões
	- **Uso de `Math.random()` como chave:**
		- Isso pode causar problemas de performance e renderização incorreta.
		- **Sugestão:** use um campo único e persistente como `user.id` ou `user.email`.
---
## ChatRoomHeader.js

É o cabeçalho do chat, tendo o nome, foto do contato, e botões de voltar, de chamada e de video.
- ### Boas práticas
	- Uso da API `Stack.Screen` para customizar o cabeçalho.
	- Layout limpo e responsivo com `react-native-responsive-screen`.
- ### Sugestões
	- Os ícones de chamada e vídeo podem ser envolvidos em `TouchableOpacity` mesmo que estejam inativos por ora, para manter consistência.
	- Adicionar acessibilidade (labels nos botões) pode melhorar a experiência para todos os usuários.
---
## CustomMenuItems.js

Define um item reutilizável para menus contextuais, usando texto, ação, valor e ícone.

- ### Boas práticas
	- Componente reutilizável com props claras (`text`, `action`, `icon`, etc).
- ### Sugestões
	- Validar props com `PropTypes` ou migrar para TypeScript.
	- Adicionar controle de acessibilidade aos menus.
---
## authContext.js

Gerencia autenticação do usuário usando Firebase Authentication e Firestore. Dando contexto global para login, logout, registro e verificação de sessão atual.

- ### Boas práticas
	- Uso correto de `createContext`, `useContext` e `useEffect` para controle de autenticação.
	- Tratamento de erros com mensagens amigáveis.
	- Armazenamento de dados extras do usuário no Firestore.

- ### Problemas e sugestões
	- **Atualização de estado assíncrona com `user`:**
		- `setUser({...user, ...})` dentro de função async pode gerar bugs se `user` estiver desatualizado.
		- **Sugestão:** usar função atualizadora: `setUser(prev => ({...prev, ...}))`.
	- **Funções recriadas desnecessariamente:**
		- `login`, `logout`, `register` não usam `useCallback`.
		- **Sugestão:** usar `useCallback` para evitar recriação nas re-renderizações.
- **Separação de responsabilidades:**
	- **Sugestão:** mover lógica de autenticação e acesso ao Firestore para arquivos de serviço reutilizáveis.
