class CreateSkins < ActiveRecord::Migration[5.2]
  def change
    create_table :skins do |t|
      t.string :name, null: false
      t.boolean :enabled

      t.timestamps
    end
  end
end
