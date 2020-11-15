import {firestore} from './Setup';

export const saveValue = (Value) => {
  const usersCollection = firestore().collection('values');
  firestore().collection(usersCollection).onSnapshot(onResult, onError);
  function onResult(QuerySnapshot) {
    console.log('Got Users collection result.');
  }

  function onError(error) {
    console.error(error);
  }
};
