# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
User.create(username: "Drake Graham", password: "password")
30.times do |i|
  username = Faker::Name.name.to_s.split(" ").join("_").downcase
  User.create(username: Faker::Name.name.to_s, password: "password")
end

# u2 = User.create(username: "demo-user2", password: "password2" )
# u3 = User.create(username: "demo-user3", password: "password3" )
# u4 = User.create(username: "demo-user4", password: "password3" )
# u5 = User.create(username: "demo-user5", password: "password3" )
# u6 = User.create(username: "demo-user6", password: "password3" )
# u7 = User.create(username: "demo-user7", password: "password3" )
# u8 = User.create(username: "demo-user8", password: "password3" )
# u9 = User.create(username: "demo-user9", password: "password3" )
# u10 = User.create(username: "demo-user10", password: "password3" )
#
# u1 = User.create(username: "demo-user", password: "password")
# u2 = User.create(username: "demo-user2", password: "password2" )
# u3 = User.create(username: "demo-user3", password: "password3" )
# u4 = User.create(username: "demo-user4", password: "password3" )
# u5 = User.create(username: "demo-user5", password: "password3" )
# u6 = User.create(username: "demo-user6", password: "password3" )
# u7 = User.create(username: "demo-user7", password: "password3" )
# u8 = User.create(username: "demo-user8", password: "password3" )
# u9 = User.create(username: "demo-user9", password: "password3" )
# u10 = User.create(username: "demo-user10", password: "password3" )

Channel.destroy_all
c1 = Channel.create(name: "general", private: false)
c2 = Channel.create(name: "test_channel2", private: false)
c3 = Channel.create(name: "test_channel3", private: false)

Membership.destroy_all
Membership.create(user_id: User.first.id, channel_id: c1.id)
Membership.create(user_id: User.first.id, channel_id: c2.id)
Membership.create(user_id: User.last.id, channel_id: c2.id)

# demo-user1 is part of test_channel1, 2
# demo-user2 is part of test_channel2
# demo-user3 is not part of a test_channel

Message.destroy_all
Message.create(user_id: User.first.id, channel_id: c1.id, content: "Yooo first message")
Message.create(user_id: User.first.id, channel_id: c1.id, content: "Second message woooo")
# both belong to the demo user Drake Graham
