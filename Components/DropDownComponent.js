import React, {useState} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DropdownComponent = props => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={props.data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={props.placeholder}
      searchPlaceholder="Search..."
      value={props.value}
      onChange={item => {
        props.onChange(item.value);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 30,
    width: windowWidth/2-50,
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius:5
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    fontWeight: '600',
    margin:10
    
  },
  selectedTextStyle: {
    fontSize: 13,
    margin:10,
    fontWeight: '600',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
  },

});
