class AddDbConstraintsToMessage < ActiveRecord::Migration[5.0]
  def change
    change_column_null :messages, :user_id, false
    change_column_null :messages, :channel_id, false
  end
end
