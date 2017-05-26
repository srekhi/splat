json.extract! message, :id, :user_id, :channel_id, :content, :emoticons
json.user user
json.created_at message.created_at.localtime.strftime("%I:%M %p")
