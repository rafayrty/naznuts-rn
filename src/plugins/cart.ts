import EncryptedStorage from 'react-native-encrypted-storage';
const addItem = async (item: any, toast: any) => {
  let newObj: Array<any>[];
  try {
    await EncryptedStorage.getItem('cart')
      .then(async res => {
        if (res !== undefined) {
          newObj = JSON.parse(JSON.stringify(JSON.parse(res)));
          if (newObj.find(x => x.id === item.id) === undefined) {
            newObj.push(item);
            await EncryptedStorage.setItem('cart', JSON.stringify(newObj));
            toast.show({
              bg: 'primary.500',
              title: 'Added To Cart',
              placement: 'top',
            });
          } else {
            toast.show({
              bg: 'danger.500',
              title: 'Already Exists',
              placement: 'top',
            });
          }
        } else {
          await EncryptedStorage.setItem('cart', JSON.stringify([item]));
        }
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(data, 'us');
  } catch (error) {
    console.error('err', error);
    // There was an error on the native side
  }
};

const deleteItem = async (id: number) => {
  try {
    await EncryptedStorage.getItem('cart').then(async res => {
      let newObj = JSON.parse(JSON.stringify(JSON.parse(res)));
      const index = newObj.findIndex(x => x.id === id);

      if (index !== -1) {
        newObj.splice(index, 1);
        await EncryptedStorage.setItem('cart', JSON.stringify(newObj));
      } else {
        Promise.reject('Not Found');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const updateItem = async (id: number, qty: number, price: number) => {
  console.log(id, qty, price);
  try {
    await EncryptedStorage.getItem('cart').then(async res => {
      let newObj = JSON.parse(JSON.stringify(JSON.parse(res)));
      const index = newObj.findIndex(x => x.id === id);

      if (index !== -1) {
        newObj[index].quantity = qty;
        newObj[index].attributes.price = price;
        await EncryptedStorage.setItem('cart', JSON.stringify(newObj));
      } else {
        Promise.reject('Not Found');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export {addItem, deleteItem, updateItem};
