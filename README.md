# 📱 Gerenciador de Tarefas - React Native

Aplicativo desenvolvido com **React Native + Expo** para demonstrar conceitos básicos da plataforma, incluindo:

- Autenticação (login e cadastro)
- CRUD de tarefas (criar, visualizar, editar, deletar)
- Armazenamento local com AsyncStorage
- Navegação entre telas

---

## 🔧 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Instalação

```bash
git clone https://github.com/DevSamuel06/todolistApp.git
cd tarefas-app
npm install
npx expo start
```
Abra no Expo Go escaneando o QR Code exibido no terminal.

---

## 🖼️ Funcionalidades
Tela de login e cadastro com verificação

Lista de tarefas com:

- Criação

- Conclusão

- Edição

- Remoção

Tela de detalhes para editar a tarefa

Armazenamento local com persistência usando AsyncStorage

---

## 📂 Estrutura do Projeto

	/src
	  /components        // Componentes reutilizáveis como botão e item de tarefa
	  /screens           // Telas principais: Login, Cadastro, Lista, Detalhes
	  /types             // Tipagem TypeScript
	  /theme             // Cores e estilos globais
	App.tsx              // Navegação entre telas

---

