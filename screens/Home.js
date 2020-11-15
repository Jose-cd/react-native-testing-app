import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, Button} from 'react-native';
import Header from './../components/Header';
import ListItem from './../components/ListItem';
import AddItem from './../components/AddItem';

export default function Home({navigation}) {
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c,
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  const [items, setItems] = useState([
    {id: uuidv4(), text: 'Milk'},
    {id: uuidv4(), text: 'Eggs'},
    {id: uuidv4(), text: 'Bread'},
    {id: uuidv4(), text: 'Another item'},
    {id: uuidv4(), text: 'One more'},
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != id);
    });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please write a item name', [{text: 'Ok'}]);
    } else {
      setItems((prevItems) => {
        return [{id: uuidv4(), text}, ...prevItems];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem deleteItem={deleteItem} item={item} />
        )}
      />
      <Button
        title="Live Values"
        onPress={() => navigation.navigate('LiveValues')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});
