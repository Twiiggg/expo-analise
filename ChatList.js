import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

export default function ChatList({users, currentUser}) {
    const router = useRouter(); // hook para navegação entre telas (boa prática de roteamento)

  return (
    <View className="flex-1">
      <FlatList
        data={users} // lista de usuários para renderizar os chats
        contentContainerStyle={{flex: 1, paddingVertical: 25}} // espaçamento vertical para estética
        keyExtractor={item=> Math.random()} // possivel problema: o uso de Math.random() como chave é ruim para performance e re-renderização
        // possivel melhoria: use um campo único e persistente como user.id ou user.email
        showsVerticalScrollIndicator={false} // esconde o scroll para aparência mais limpa
        renderItem={({item, index})=> 
          <ChatItem 
            noBorder={index+1 == users.length} // define se é o último item para esconder a borda inferior (boa prática de UI)
            router={router} // passa o roteador para o item (boa prática de separação de responsabilidades)
            currentUser={currentUser} // passa o usuário atual para lógica condicional interna
            item={item} 
            index={index} 
          />
        }
      />
    </View>
  )
}
