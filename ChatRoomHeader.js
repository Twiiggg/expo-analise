import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
      options={{
        title: '', // titulo vazio para não mostrar texto no cabeçalho
        headerShadowVisible: false, // remove sombra do cabeçalho para design mais limpo
        headerLeft: ()=>(
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={()=> router.back()}>
              {/* botão de voltar do entypo*/}
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              {/* imagem de perfil e nome do usuário */}
              <Image 
                source={user?.profileUrl} // verifica se o usuário tem imagem
                style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}} // imagem circular
              />
              <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                {user?.username} {/* nome do usuário exibido no cabeçalho*/}
              </Text>
            </View>
          </View>
        ),
        headerRight: ()=>(
          <View className="flex-row items-center gap-8">
            {/* icones de chamada e vídeo, funcionalidades futuras talvez */}
            <Ionicons name="call" size={hp(2.8)} color={'#737373'} />
            <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} />
          </View>
        )
      }}
    />
  )
}
