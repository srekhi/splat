# API Endpoints

## HTML API

#### Root
- `GET /` - load Spack application

## JSON API

### Users
- `GET /api/users` - retrieve all users
- `GET /api/channel/:channel_id/users` - retrieve all users of a channel
- `POST /api/users` - create a user
- `PATCH /api/users/:id` - update a user
- `DELETE /api/users/:id` - delete a user

### Session
- `POST api/session` -log in
- `DELETE /api/session` - log out

### Channels
- `GET /api/channels` - retrieve all channels
- `POST /api/channels` - create a channel
- `PATCH /api/channels/:id` - update a channel
- `DELETE /api/channels/:id` - delete a channel

### Messages
- `GET /api/messages` - retrieve all messages
- `GET /api/channels/:channel_id/messages` - retrieve all messages of a channel
- `POST /api/messages/` - create a message
- `PATCH /api/messages/:id` - update a message
- `DELETE /api/messages/:id` - delete a message

### Memberships
- `GET /api/users/:user_id/memberships` - retrieve the channels of a user
- `GET /api/channels/:channel_id/memberships` - retrieve the users of a channel
