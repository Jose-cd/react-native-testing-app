import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListItem({item, deleteValue, editValue}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newValue, setNewValue] = useState();

  const onChange = (e) => {
    // format the input
    var input = e.split(','),
      int = input[0].replace(/\./g, ''),
      dec = input[1],
      output = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    e = output + (dec !== undefined ? ',' + dec : '');
    setNewValue(e);
  };
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.value}</Text>
        <Icon
          name="edit"
          size={30}
          color="firebrick"
          onPress={() => setModalVisible(true)}
          style={styles.editIcon}
        />
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="New Value"
                keyboardType="numeric"
                value={newValue}
                onChangeText={onChange}
              />
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  setNewValue(''),
                    setModalVisible(false),
                    editValue(item.id, newValue);
                }}>
                <Text style={styles.textStyle}>Edit</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Icon
          name="remove"
          size={30}
          color="firebrick"
          onPress={() => deleteValue(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  editIcon: {
    marginLeft: 200,
    // paddingTop: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 80,
    paddingLeft: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    elevation: 2,
    marginBottom: 5,
  },
});
