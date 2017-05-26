class AddIndices < ActiveRecord::Migration[5.0]
  def change
    add_index :emoticons, :message_id
    
  end
end
