class AddDbConstraintsToMessageContent < ActiveRecord::Migration[5.0]
  def change
    change_column_null :messages, :content, false
  end
end
