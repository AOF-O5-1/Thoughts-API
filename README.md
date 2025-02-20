# ThoughtShare API

## Overview
ThoughtShare API is a backend service that allows users to share thoughts, react to others' thoughts, and manage a friend list. It is built using Node.js, Express, and MongoDB with Mongoose ODM.

## Features
- User account creation and management
- Posting and retrieving thoughts
- Reacting to thoughts
- Managing a friend list

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **API Testing**: Insomnia/Postman

## Installation
### Prerequisites
- Node.js (latest LTS version recommended)
- MongoDB (Local or Atlas cluster)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/AOF-O5-1/Thoughts-API.git
   cd thought-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```sh
   MONGODB_URI=''
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:userId` - Get a user by ID
- `PUT /api/users/:userId` - Update a user
- `DELETE /api/users/:userId` - Delete a user
- `POST /api/users/:userId/friends/:friendId` - Add a friend
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend

### Thoughts
- `GET /api/thoughts` - Get all thoughts
- `POST /api/thoughts` - Create a new thought
- `GET /api/thoughts/:thoughtId` - Get thoughts by user
- `PUT /api/thoughts/:thoughtId` - Update a thought
- `DELETE /api/thoughts/:thoughtId` - Delete a thought
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction

## Database Seeding
To seed the database with test data:
```sh
npm run seed
```

## Testing the API
You can use **Postman** or **Insomnia** to test the API. Ensure the 
server is running before making requests.

## Links
Repo - [Thought-API](https://github.com/AOF-O5-1/Thoughts-API)
Tutorial - [Video](https://drive.google.com/file/d/1OaqHNK51KjF72ZsJkFHN6YStR0Ka2UpU/view)


## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for discussion.



## Contact
Ade Fajemisin 
- [GitHub](https://github.com/AOF-O5-1)
- [Email](marcusfajemisin@gmail.com)



