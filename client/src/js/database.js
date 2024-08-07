import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const addToDb = await openDB('jate',1);
  const tx = addToDb.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({content: content});
  const result = await request;
  console.log (result);
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const getFromDb = await openDB('jate',1);
  const tx = getFromDb.transaction('jate','readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log (result);
  if ( result.length > 0) {
    return result[result.length - 1].content;
  } else {
    return '';
  }
}

initdb();
