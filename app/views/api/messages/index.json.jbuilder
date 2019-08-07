json.array! @new_messages do |message|
  json.text message.text
  json.image message.image
  json.created_at message.created_at.strftime("%Y-%m-%d %H:%M")
  json.user_name message.user.name
  json.id message.id
  json.group_id message.group.id
end