class AddIndexToEmoticons < ActiveRecord::Migration[5.0]
  def change
    add_index :emoticons, [:user_id, :message_id]
    remove_index :emoticons, name: "index_emoticons_on_user_id"
  end
end
