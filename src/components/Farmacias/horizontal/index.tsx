import { View, Pressable, Text, Image, Modal, FlatList, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { FarmaciaProps } from '..';

export function FarmaciaItem({ item }: { item: FarmaciaProps }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduto, setSelectedProduto] = useState<any | null>(null); // Estado para o produto selecionado
  const [isProdutoModalVisible, setIsProdutoModalVisible] = useState(false); // Estado para o modal de detalhes do produto

  // Função para obter os produtos da farmácia
  useEffect(() => {
    async function fetchProdutos() {
      const response = await fetch(`http://192.168.18.3:3000/remedios?farmaciaId=${item.id}`);
      const data = await response.json();
      setProdutos(data);
      setFilteredProdutos(data);
    }

    if (isModalVisible) {
      fetchProdutos();
    }
  }, [isModalVisible]);

  // Função para filtrar os produtos com base na pesquisa
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = produtos.filter((produto) =>
      produto.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProdutos(filtered);
  };

  // Função para abrir o modal de detalhes do produto
  const handleProdutoPress = (produto: any) => {
    setSelectedProduto(produto);
    setIsProdutoModalVisible(true);
  };

  return (
    <>
      <Pressable
        className="flex flex-col items-center justify-center"
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-full"
        />
        <Text className="text-sm mt-2 w-20 text-center leading-4 text-black" numberOfLines={2}>
          {item.name}
        </Text>
      </Pressable>

      {/* Modal de Produtos */}
      <Modal visible={isModalVisible} animationType="slide">
        <View className="flex-1 p-4 bg-white">
          <Text className="text-xl font-bold mb-4">{item.name}</Text>

          {/* Barra de Pesquisa */}
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Pesquise por produtos"
            className="border p-2 mb-4"
          />

          {/* Lista de Produtos */}
          <FlatList
            data={filteredProdutos}
            renderItem={({ item }) => (
              <Pressable className="flex-row items-center justify-between mt-4" onPress={() => handleProdutoPress(item)}>
                <Image source={{ uri: item.image }} className="w-20 h-20 rounded" />
                <Text className="flex-1 ml-4">{item.name}</Text>
                <Text className="text-sm">{item.price} R$</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />

          {/* Botão para Voltar */}
          <Pressable onPress={() => setIsModalVisible(false)} className="mt-4">
            <Text className="text-lg text-red-500">Voltar</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Modal de Detalhes do Produto */}
      <Modal visible={isProdutoModalVisible} animationType="slide">
        <View className="flex-1 p-4 bg-white">
          {selectedProduto && (
            <>
              <Text className="text-2xl font-bold">{selectedProduto.name}</Text>
              <Image
                source={{ uri: selectedProduto.image }}
                className="w-full h-48 rounded-lg mt-4"
              />
              <Text className="mt-4">{selectedProduto.price} R$</Text>
              <Text className="mt-4">{selectedProduto.time}</Text>
              <Text className="mt-4">{selectedProduto.delivery} R$ para entrega</Text>

              {/* Botões */}
              <Pressable
                onPress={() => console.log('Compra realizada! (apenas ilustrativo)')}
                className="mt-4 bg-green-500 p-2 rounded-full"
              >
                <Text className="text-white text-center">Comprar</Text>
              </Pressable>

              <Pressable
                onPress={() => setIsProdutoModalVisible(false)}
                className="mt-4 bg-gray-500 p-2 rounded-full"
              >
                <Text className="text-white text-center">Voltar</Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}
