import EncryptedStorage from 'react-native-encrypted-storage';
// import UserContext from '../../UserContext';

const StoreData = async (key: string, data: any) => {
  // const [, setUser] = React.useContext<any>(UserContext);

  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
    console.log(data, 'us');
    // setUser(data);

    // if (key === 'user') {
    // setUser(data);
    // }
  } catch (error) {
    console.error(error);
    // There was an error on the native side
  }
};

const GetData = async (key: string): Promise<string | null | undefined> => {
  try {
    const session = await EncryptedStorage.getItem(key);
    if (session !== undefined) {
      // Congrats! You've just retrieved your first value!
    }
    return session;
  } catch (error) {
    // There was an error on the native side
  }
};

const DeleteData = async (key: string): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(key);
    // if (key === 'user') {
    //   setUser(null);
    // }
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
  }
};
export {StoreData, GetData, DeleteData};
