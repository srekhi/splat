@notifications.each do |notification|
    json.extract! notification, :id, :user_id, :channel_id
end
