import { verifyWebhook } from '@clerk/express/webhooks'
import express from 'express'
//import { clerkClient } from '@clerk/express'
import { createUser, deleteUser } from '../../features/users/actions/user.action.ts'

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Hello World')
})

router.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    const { id } = evt.data
    const eventType = evt.type

    if (eventType === 'user.created') {
      console.log('user data:', evt.data)

      const clerkID = evt.data.id
      const email = evt.data.email_addresses[0].email_address

      const user = ({
        clerkID,
        email
      })

      await createUser(user);

      console.log("User created:" + user);
    }

    if (eventType === 'user.deleted') {
      console.log('user to be deleted:', evt.data)

      const clerkID_delete = evt.data.id
      console.log('clerkId:', clerkID_delete)

      const deletedUser = await deleteUser(clerkID_delete!);

      if (deletedUser) {
        console.log('User deleted:', evt.data.id)
      } else {
        console.log('Error deleting user, is there a clerk id provided?')
      }
    }

    return res.send('Webhook received')
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return res.status(400).send('Error verifying create webhook')
  }
})

export default router; 