# TOP-members-only

My implementation of [The Odin Project's](https://www.theodinproject.com/) "members only" project.

## Usage

### Prepare REST API server

1. Go to `./server`
2. Run `npm install`.
3. Rename the file `.env.example` to `.env`.
4. Open that file and fill in the empty strings.
    1. `NODE_ENV`: `development` or `production`
    2. `DEBUG`: Which debug namespaces to log, e.g. `server:*` to log every server namespace.
    3. `MONGODB_URI`: URI to a MongoDB server.
    4. `DB_NAME`: Name of the database in which all information should be stored.
    5. `SESSION_SECRET`: A secret string to protect session IDs.
    6. `MEMBERSHIP_PASSCODE`: The secret passcode a user has to enter to become a club member.
    7. `ADMIN_PASSCODE`: The secret passcode a user has to enter to become an admin.

### Prepare frontend dev server

1. Go to `./client`
2. Run `npm install`.

Additional steps for production mode only:
1. Rename the file `.env.production.example` to `.env.production`
2. Open that file and fill in the empty strings.
    1. `VITE_API_BASE_URL`: The base URL to the API server, e.g. `https://my-api-server.com`.

### Start application (development)

1. Go to `./server` and run `npm run dev`.
2. Open another terminal.
3. Go to `./client` and run `npm run dev`.
4. Open browser and visit `localhost:5173`.
