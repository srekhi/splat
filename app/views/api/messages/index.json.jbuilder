@messages.each do |message|
  json.set! message.id do
    json.extract! message, :id, :user_id, :channel_id, :content, :user, :created_at
    json.created_at message.created_at.localtime.strftime("%I:%M %p")
  end
end
