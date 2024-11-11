import { View, Pressable, Image } from 'react-native';

export function Banner() {
  return (
    <View className='w-full h-36 md:h-60 rounded-2xl mt-5 mb-4'>
      <Pressable
        className='w-full h-full rounded-2xl flex justify-center items-center' // Centraliza o conteúdo
        onPress={() => console.log("Clicou no banner")}
      >
        <Image 
          source={require("../../assetes/banner.png")} 
          className='w-full h-full max-w-[100%] max-h-[100%]' // Responsividade com limite de tamanho
        />
      </Pressable>
    </View>
  );
}
