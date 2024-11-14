import { useState, useEffect } from 'react';
import { FlatList, Modal, View, Text, Pressable, Image, Button } from 'react-native';
import { CardHorizontalRemedio } from './remedios';

export interface RemedioProps{
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    restaurantId: string; 
}

export function TrendingPharma() {
    const [Remedios, setRemedios] = useState<RemedioProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRemedio, setSelectedRemedio] = useState<RemedioProps | null>(null);

    useEffect(() => {
        async function getRemedios() {
            const response = await fetch("http://192.168.18.3:3000/remedios");
            const data = await response.json();
            setRemedios(data);
        }

        getRemedios();
    }, []);
    
    const handleCardPress = (remedio: RemedioProps) => {
        setSelectedRemedio(remedio);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRemedio(null);
    };

    return (
        <>
            <FlatList 
                data={Remedios}
                renderItem={({ item }) => (
                    <CardHorizontalRemedio
                        remedio={item}
                        onPress={() => handleCardPress(item)}
                    />
                )}
                horizontal={true}
                contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
            />

            {selectedRemedio && (
                <Modal
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                    animationType="slide"
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <Image
                            source={{ uri: selectedRemedio.image }}
                            style={{ width: 200, height: 200, borderRadius: 10 }}
                        />
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
                            {selectedRemedio.name}
                        </Text>
                        <Text style={{ fontSize: 18, color: 'green', marginVertical: 10 }}>
                            R$ {selectedRemedio.price}
                        </Text>
                        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                            {selectedRemedio.time}
                        </Text>
                        <Pressable style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Comprar</Text>
                        </Pressable>
                        <Pressable onPress={handleCloseModal} style={{ marginTop: 20 }}>
                            <Text style={{ color: 'red' }}>Voltar</Text>
                        </Pressable>
                    </View>
                </Modal>
            )}
        </>
    );
}
