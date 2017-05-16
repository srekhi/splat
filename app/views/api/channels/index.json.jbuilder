json.array! @channels do |channel|
  json.extract! channel, :id, :name, :created_at
  json.userCount channel.users.count
end
