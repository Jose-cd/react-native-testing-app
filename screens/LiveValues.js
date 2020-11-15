import React, {useState, useEffect} from 'react';
import {firestore, firebase} from '../Setup';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListValue from '../components/ListValue';
export default function LiveValues() {
  const usersCollectionRef = firestore().collection('values');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const onChange = (e) => {
    // format the input
    var input = e.split(','),
      int = input[0].replace(/\./g, ''),
      dec = input[1],
      output = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    e = output + (dec !== undefined ? ',' + dec : '');
    setValue(e);
  };

  useEffect(() => {
    // subscribe for changes
    usersCollectionRef.orderBy('dateInserted', 'desc').onSnapshot(
      (querySnapshot) => {
        const newValues = [];
        querySnapshot.forEach((snap) => {
          const value = snap.data().value;
          const id = snap.id;
          newValues.push({value: value, id: id});
        });
        setItems(newValues);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  const addValue = (value) => {
    if (!value) {
      alert('Write something!');
    } else {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        value: value,
        dateInserted: timestamp,
      };
      usersCollectionRef
        .add(data)
        .then((_doc) => {
          setValue('');
          Keyboard.dismiss();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const deleteValue = (id) => {
    usersCollectionRef
      .doc(id)
      .delete()
      .then(() => {
        console.log('deleted!');
      });
  };

  const editValue = (id, newValue) => {
    console.log('el id es: ' + id + 'el nuevo valor: ' + newValue);
    usersCollectionRef
      .doc(id)
      .update({
        value: newValue,
      })
      .then(() => {
        console.log('edited!');
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add Number"
        style={styles.input}
        onChangeText={onChange}
        value={value}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText} onPress={() => addValue(value)}>
          <Icon name="plus" size={20} />
          Add Number
        </Text>
      </TouchableOpacity>
      <FlatList
        keyExtractor={(item) => item.id}
        data={items}
        renderItem={({item}) => (
          <ListValue
            item={item}
            deleteValue={deleteValue}
            editValue={editValue}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});
