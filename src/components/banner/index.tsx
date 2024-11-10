import { View, Pressable, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view'

export function Banner() {
 return (
   <View className='w-full H-36 rounded-2Xl mt-5 mb-4'>
    <PagerView style={{ flex:1 }}></PagerView>
   </View>
  );
}