import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage"; 

export const uploadImage = (path, file) => {
    const storage = getStorage()
    const reference = ref(storage, path)
   
    return uploadString(reference, file, 'data_url')
       .then(snapshot => {
         return getDownloadURL(snapshot.ref)
       }).catch(error =>{
         console.log(error)
       })
}

export const uploadVoice = (path, file) => {
  const storage = getStorage()
  const reference = ref(storage, path)
 
  return uploadString(reference, file, 'data_url')
     .then(snapshot => {
       return getDownloadURL(snapshot.ref)
     }).catch(error =>{
       console.log(error)
     })
}