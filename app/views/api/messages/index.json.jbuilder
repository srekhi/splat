@messages.each do |message|
  json.set! message.id do
    json.extract! message, :id, :user_id, :channel_id, :content, :user, :created_at
  end
end
