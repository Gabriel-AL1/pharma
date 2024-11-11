import { View, Text} from 'react-native';
import { useState, useEffect } from 'react';
import { FarmaciaItem } from './item';

export interface FarmaciaProps{
    id:string;
    name:string;
    image:string;
}

export function FarmaciaVerticalList() {
    const [Farmacia, setFarmacia] = useState<FarmaciaProps[]> ([])

    useEffect(() => {
        async function getRemedios() {
            const response = await fetch("http://192.168.18.3:3000/farmacias")
            const data = await response.json()
            console.log(data);
            setFarmacia(data);
        }

        getRemedios();
    }, [])

 return (
   <View className='px-4 gap-4'>
    {Farmacia.map( item => (
        <FarmaciaItem item={item} key={item.id}/>
    ))}
   </View>
  );
}