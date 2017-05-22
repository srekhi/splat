@notifications.each do |notification|
  json.set! notification.id do
    json.extract! notification, :id, :user_id, :channel_id
  end
end
