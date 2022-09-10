import React from 'react';
import {View, Image, Text, Dimensions,StyleSheet} from 'react-native';
import DropdownComponent from './DropDownComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function DropDownCard(props) {
  return (
    <View
      style={styles.mainContainer}>
      <View style={{alignItems: 'center'}}>
        <View
          style={ {
            backgroundColor:props.backgroundColor,
            width: 50,
            height: 50,
            borderRadius: 100,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center'}}>
          <Image source={props.image} style={{width: 30, height: 30}} />
        </View>
        <View>
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>{props.title}</Text>
        </View>
        <DropdownComponent
          placeholder={props.placeholder}
          value={props.value}
          onChange={value => props.onChange(value)}
          data={props.data}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: 'white',
        width: windowWidth / 2 - 30,
        borderRadius: 10,
        margin: 10,
        borderColor: 'grey',
        borderWidth: 0.4,
        elevation: 2,

    },
  
 
})
