import { Text, View } from 'react-native';
import {
    MenuOption,
} from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// componente reusavel para criar itens de menu com ação e ícone
export const MenuItem = ({text, action, value, icon})=>{
    return (
        <MenuOption onSelect={()=> action(value)}>
            {/* exibe o texto do menu e o ícone alinhados horizontalmente */}
            <View className="px-4 py-1 flex-row justify-between items-center">
                <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-600">
                    {text}
                </Text>
                {icon} {/* icone da opção de menu */}
            </View>
        </MenuOption>
    )
}

// boa prática: componente isolado e reutilizável melhora manutenção e escalabilidade
// sugestão: validar props (ex: PropTypes ou TypeScript) para deixar mais robusto
