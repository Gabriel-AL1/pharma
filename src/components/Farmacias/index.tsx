import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { FarmaciaItem } from './horizontal'; 

export interface FarmaciaProps{
    id:string;
    name:string;
    image:string;


}

export  function Farmacias() {
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
    <FlatList 
    data={Farmacia}
    renderItem={({ item }) => <FarmaciaItem item={item}/>}
    horizontal={true}
    contentContainerStyle={{gap: 14, paddingLeft: 16, paddingRight: 16}}
    showsHorizontalScrollIndicator={false}
    />
  );
}