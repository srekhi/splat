# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
u1 = User.create(username: "demo-user", password: "password", email: "drake@ovo.com")
u2 = User.create(username: "demo-user2", password: "password2", email: "drake2@ovo.com")
u3 = User.create(username: "demo-user3", password: "password3", email: "drake3@ovo.com")


Channel.destroy_all
c1 = Channel.create(name: "test_channel1", private: false)
c2 = Channel.create(name: "test_channel2", private: false)
c3 = Channel.create(name: "test_channel3", private: false)


Membership.destroy_all
Membership.create(user_id: u1.id, channel_id: c1.id )
Membership.create(user_id: u1.id, channel_id: c2.id )
Membership.create(user_id: u2.id, channel_id: c2.id )

# demo-user1 is part of test_channel1, 2
# demo-user2 is part of test_channel2
# demo-user3 is not part of a test_channel
