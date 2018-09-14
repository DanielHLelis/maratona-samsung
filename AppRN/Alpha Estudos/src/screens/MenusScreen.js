import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import constants from '@config/constants';

import StyleMain from '@styles/StyleMain';

let listaTop = [
    {id: '1', name: "Sangue de Utubunda OS X Low Sierra tem poder", image: constants.LOGO},
    {id: '2', name: "rsrsrs", image: constants.LOGO},
    {id: '3', name: "Arroz SZ", image: constants.LOGO},
]

export default class MenusScreen extends React.Component{

    render(){
        return(
            <View style={{backgroundColor: '#fff', height: Dimensions.get('screen').height}}>
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