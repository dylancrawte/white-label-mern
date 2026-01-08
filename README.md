# White - Label MERN Stack Application

Mobile application featuring basic features, ready to take your idea off the ground, without the boring set up!
- React Native Expo frontend
- MongoDB backend connected
- Clerk Authentication
- Dockerized

# 🛠️ Set up and installation

(QUICKSTART / PREVIEW)
1. Root directory

   ```bash
   docker compose up
   ```

- You will still need to configure database connection. See backend/README.md
- Also see frontend/README.md for further details on environment variables for client.
- IMPORTANTLY, this route is a quick start / preview, and is not the best development option. See below for dev path.


(LOCAL DEV PATH)
### Client ###
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

### Server ###
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




   



