class AddIndicesToSchema < ActiveRecord::Migration[5.0]
  def change
    add_index :emoticons, :user_id, using: :btree
    add_index :notifications, [:user_id, :channel_id], using: :btree
    add_index :memberships, [:channel_id, :user_id], using: :btree 
  end
end
