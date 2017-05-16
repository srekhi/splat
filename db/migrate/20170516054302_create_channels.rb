class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.boolean :private, default: false

      t.timestamps
    end
    add_index :channels, :name 
  end
end
