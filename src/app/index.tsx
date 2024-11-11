import { Text, View, ScrollView } from "react-native";
import Header from "../components/header";

import Constants from 'expo-constants';
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { TrendingPharma } from "../components/trending";
import { Farmacias } from "../components/Farmacias";
import { FarmaciaVerticalList } from "../components/list";


const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView style={{ flex:1 }} 
    className="bg-slate-200"
    showsHorizontalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8}}>
        <Header/>
        <Banner/>
        <Search/>
      </View>
        <Section
        name="Remedios em alta"
        label="Veja mais"
        action={ () => console.log("Clicouuu no veja")}
        size="text-2xl"
        />
        
        <TrendingPharma/>
        
        <Section
        name="Famosos no PharmaTech"
        label="Veja todos"
        action={ () => console.log("Clicouuu nos famosos")}
        size="text-xl"
        />

        <Farmacias/>

        <Section
        name="Farmacia"
        label="Veja todos"
        action={ () => console.log("Clicouuu na farmacia")}
        size="text-xl"
        />

        <FarmaciaVerticalList/>

    </ScrollView>
  );
}
