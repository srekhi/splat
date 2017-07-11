class IntroductionJob < ApplicationJob
    queue_as :default

    def perform(user)
      intro_dm = Channel.create(name: "dm", private: true)
      sunny = User.find_by(username: "sunny")
      Membership.create(user_id: user.id, channel_id: intro_dm.id)
      Membership.create(user_id: sunny.id, channel_id: intro_dm.id)
      Message.create(user_id: sunny.id, channel_id: intro_dm.id, content: "Hi, I'm Sunny! Welcome to Splat!")
    end

  end
