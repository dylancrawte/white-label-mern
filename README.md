# White - Label MERN Stack Application, ready for customization!

Mobile application featuring basic features, ready to take your idea off the ground without the boring set up!
- React Native Expo frontend
- MongoDB backend connected
- Clerk Authentication
- Docker images

# 🛠️ Set up and installation

(QUICKSTART)
1. Root directory

   ```bash
   docker compose up
   ```

This will spin up the frontend and api images. You will still need to configure the database. See backend/README.md for further details on connecting.
There are also environment variables to be set up in the frontend. See frontend/README.md for further details.


(Local dev path)
### client ###
1. Navigate to frontend dir and install dependencies

   ```bash
   cd frontend
   bun install
   ```
   
2. Configure environment variables

   - Copy env.example into .env
   - FIll in required variables (see frontend/README.md for further details on connecting Clerk)

3. Start client

   ```bash
   npx expo start
   ```
You can now run application on IOS, Android (using Expo Go), or Web.

### server ###
4. Navigate to backend dir and install dependencies

   ```bash
   cd ../backend
   npm install
   ```
5. Configure backend environment variables

   - See backend/README.md for further details connecting MongoDB

6. Start server

   ```bash
   npm run dev
   ```

You're good to go!




   



