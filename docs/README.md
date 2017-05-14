# Spack Development
[Heroku link][heroku]

[Trello link][trello]

[heroku]: https://spack.herokuapp.com/
[trello]: https://trello.com

## Minimum Viable Product
Spack is a web application inspired by Slack built using Ruby on Rails and React/Redux. By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

- Live chat
- Channels
- Direct Message
- Teams or multi-person DM
- Bonus: Search Messages
- Bonus: Notifications

## Proposal
- MVP
- Wireframes
- React Components
- Static State
- DB Schema
- API Endpoints
- Timeline

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: wireframes
[components]: component-hierarchy.md
[sample-state]: sample-state.md
[api-endpoints]: api-endpoints.md
[schema]: schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days)

**Objective:** Functioning rails project with front-end Authentication

### Phase 2: Channel Model, API, and components (2 days)

**Objective:** Channels can be created, read, edited and destroyed through the API.

### Phase 3: Messages (2 days)

**Objective:** Messages belong to channels and can be created, read, edited and destroyed through the API.
ActionCable sends the messages to the channel members.

### Phase 4: Direct Messages (2 days)

**Objective:** Implement private, direct messaging.

### Phase 5: Multi-Person Direct Messages (1 day)

**Objective:** Creation of direct messages to multiple recipients; a channel is created with those people as members.

### Bonus Features (TBD)
- [ ] Search Messages
- [ ] Notifications
