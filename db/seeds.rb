# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

users = []

u1 = User.create(username: "drake", password: "password")
u2 = User.create(username: "test", password: "password")
u3 = User.create(username: "50-cent", password: "password")
u4 = User.create(username: "sunny", password: "sunny-pass")
u4.avatar_url = "http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_38/v1495598891/Screen_Shot_2017-05-23_at_9.07.55_PM_tab5wm.png"
u4.save

30.times do |i|
  username = Faker::Name.first_name.to_s.split(" ").join("_").downcase
  u = User.create(username: username, password: "password")
  users.push(u)
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
c2 = Channel.create(name: "harry_potter_quotes", private: false)
c3 = Channel.create(name: "chuck_norris_programs", private: false)

d1 = Channel.create(name: "private_channel1", private: true)
d2 = Channel.create(name: "private_channel2", private: true)
d3 = Channel.create(name: "private_channel3", private: true)

channel_ids = [c1.id, c2.id, c3.id, d1.id, d2.id, d3.id]

Membership.destroy_all
Membership.create(user_id: User.first.id, channel_id: c1.id)
Membership.create(user_id: User.first.id, channel_id: c2.id)
Membership.create(user_id: User.first.id, channel_id: c3.id)

Membership.create(user_id: User.last.id, channel_id: c2.id)

Membership.create(user_id: User.last.id, channel_id: d1.id)
Membership.create(user_id: User.first.id, channel_id: d1.id)

Membership.create(user_id: User.first.id, channel_id: d2.id)
Membership.create(user_id: users.sample.id, channel_id: d2.id)


sample_emojis= %w(
  :yum:
  :satisfied:
  :scream:
  :confounded:
  :dizzy_face:
  :joy:
  :stuck_out_tongue_winking_eye:
  :flushed:
  :100:
  :grimacing:
  :unamused:
  :100:
  :heart_eyes:
  :joy:
  :satisfied:
  :joy:
  :sweat_smile:
  :stuck_out_tongue_closed_eyes:
  :scream:
  :joy:
  :disappointed_relieved:
  :hear_no_evil:
  :triumph:
  :scream_cat:
  :tired_face:
  :blush:
  :grin:
  :hear_no_evil:
  :sweat_smile:
  :scream:
  :ok_hand:
  :sweat:
  :confounded:
  :disappointed_relieved:
)

# demo-user1 is part of test_channel1, 2
# demo-user2 is part of test_channel2
# demo-user3 is not part of a test_channel

#Faker::HowIMetYourMother.quote

Message.skip_callback(:commit, :after, :broadcast_message)
Message.destroy_all
Message.create(user_id: User.first.id, channel_id: c1.id, content: "Yooo first message")
Message.create(user_id: User.first.id, channel_id: c1.id, content: "Second message woooo")
# both belong to the demo user Drake Graham

30.times do
  sample_user_id = users.sample.id
  sample_emoji = sample_emojis.sample
  message = Message.create(user_id: sample_user_id, channel_id: c2.id, content: Faker::HarryPotter.quote )
  rand(4).times do
    Emoticon.create(user_id: users.sample.id, message_id: message.id, icon: sample_emojis.sample)
  end
  Membership.create(user_id: sample_user_id, channel_id: c2.id)
end

5.times do
  Notification.create(user_id: u1.id, channel_id: c2.id)
end


30.times do
  sample_user_id = users.sample.id
  Message.create(user_id: sample_user_id, channel_id: c3.id, content: Faker::ChuckNorris.fact )
  Membership.create(user_id: sample_user_id, channel_id: c3.id)
end

m1 = Membership.create(user_id: u1.id, channel_id: c1.id)
m2 = Membership.create(user_id: u2.id, channel_id: c1.id)

# now both drake and test are subscribed to general channel
