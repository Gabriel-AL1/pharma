import { View, Text, Pressable } from 'react-native';
import { Feather } from "@expo/vector-icons";
//Criação de componentes dinamicos
interface Props {
  name: string;
  size: "text-lg" | "text-xl" | "text-2xl";
  label: string;
  action: () => void;
}

export function Section({ name, size, label, action}: Props) {
 return (
   <View className='w-full flex flex-row items-center justify-between px-4'>
    <Text className={`${size} font-semibold my-4 self-start`}>{name}</Text>

    <Pressable>
      <Text onPress={action}>{label}</Text>
    </Pressable>
   </View>
  );
}