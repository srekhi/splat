json.array! @notifications do |notif|
  json.extract! notif, :id, :channel_id, :user_id
end
