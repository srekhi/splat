class AddFormattedChatTimeToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :chat_time, :string
  end
end
