const functions = require('firebase-functions')
const logger = require('firebase-functions/logger')

const admin = require('firebase-admin')

const serviceAccount = require('./network-bd4d1-firebase-adminsdk-13264-8ed3e67031.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://network-bd4d1-default-rtdb.europe-west1.firebasedatabase.app'
})

exports.notificationHandler = functions.https.onCall(async (data, context) => {
  try {
    let db = admin.firestore()
    let token = ''
    let title = ''

    await db
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const usersData = doc.data()
          if (usersData.uid === data.id) token = usersData.token
          if (usersData.uid === data.title) title = usersData.displayName
        })
      })

    const message = {
      notification: {
        title,
        body: data.body
      },
      token
    }

    const res = await admin.messaging().send(message)

    return {
      message
    }
  } catch (error) {
    console.log('Error sending message:', error)
    return {
      error
    }
  }
})
