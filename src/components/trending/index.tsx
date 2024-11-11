import { useState, useEffect } from 'react';
import { CardHorizontalRemedio  } from './remedios';
import { FlatList } from 'react-native';

export interface RemedioProps{
    id: string;
    name: string;
    price: number;
    time: string;
    delevery: number;
    rating: number;
    image: string;
    restaurantId: string; 
}
export function TrendingPharma() { 
    const [Remedios, setRemedios] = useState<RemedioProps[ ]>([])

    useEffect(() => {
        async function getRemedios() {
            const response = await fetch("http://192.168.18.3:3000/remedios")
            const data = await response.json()
            console.log(data);
            setRemedios(data);
        }

        getRemedios();
    }, [])
    
 return (
   <FlatList 
   data={Remedios}
   renderItem={({ item }) => <CardHorizontalRemedio remedio={item}/>}
   horizontal={true}
   contentContainerStyle={{gap: 14, paddingLeft: 16, paddingRight: 16}}
   showsHorizontalScrollIndicator={false}
   />
  );
}