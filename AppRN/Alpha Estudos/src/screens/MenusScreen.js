import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import constants from '@config/constants';
import images from '@config/images';

import StyleMain from '@styles/StyleMain';
import Header from '@components/Header';

let listaTop = [
    {id: '1', name: "Sangue de Utubunda OS X Low Sierra tem poder", image: images.LOGO},
    {id: '2', name: "rsrsrs", image: images.LOGO},
    {id: '3', name: "Arroz SZ", image: images.LOGO},
]

export default class MenusScreen extends React.Component{

    render(){
        return(
            <View style={{backgroundColor: '#fff', height: Dimensions.get('screen').height}}>
                <Header leftPress={() => this.props.navigation.navigate('AppIntro')} leftImage={images.SETA} rightImage={images.OPTIONS}/>
                <FlatList
                    data={listaTop}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <View style={StyleMain.listItem}>
                            <Image source={item.image} style={StyleMain.littleIco}/>
                            <Text style={StyleMain.listText}>{item.name}</Text>
                        </View>
                        
                    }
                ></FlatList>
            </View>
        );
    }

}