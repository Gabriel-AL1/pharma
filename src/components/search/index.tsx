import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Pressable, Image, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface RemedioProps {
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    farmaciaId: string;
}

export function Search() {
    const [searchText, setSearchText] = useState('');
    const [remedios, setRemedios] = useState<RemedioProps[]>([]);
    const [filteredRemedios, setFilteredRemedios] = useState<RemedioProps[]>([]);
    const [selectedRemedio, setSelectedRemedio] = useState<RemedioProps | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Fetch inicial dos remédios
    useEffect(() => {
        async function fetchRemedios() {
            const response = await fetch("http://192.168.18.3:3000/remedios");
            const data = await response.json();
            setRemedios(data);
        }

        fetchRemedios();
    }, []);

    // Atualiza as opções filtradas enquanto o usuário digita
    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredRemedios([]);
        } else {
            const results = remedios.filter(remedio =>
                remedio.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRemedios(results);
        }
    }, [searchText, remedios]);

    // Abre o modal com os detalhes do remédio selecionado
    const handleSelectRemedio = (remedio: RemedioProps) => {
        setSelectedRemedio(remedio);
        setModalVisible(true);
    };

    // Fecha o modal de detalhes
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRemedio(null);
    };

    return (
        <View className="w-full">
            {/* Barra de pesquisa */}
            <View className="flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent">
                <Feather name="search" size={24} color="#64748b" />
                <TextInput
                    placeholder="Procure seu remédio"
                    className="flex-1 bg-transparent"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Lista de resultados da pesquisa */}
            {filteredRemedios.length > 0 && (
                <View style={{ maxHeight: 200, backgroundColor: 'white', borderRadius: 10, marginTop: 5 }}>
                    <FlatList
                        data={filteredRemedios}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleSelectRemedio(item)} style={{ padding: 10 }}>
                                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}

            {/* Modal de detalhes do remédio */}
            <Modal
                visible={modalVisible}
                onRequestClose={handleCloseModal}
                animationType="slide"
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    {selectedRemedio && (
                        <>
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
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
}
