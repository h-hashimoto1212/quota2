class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :quota, foreign_key: true
      t.references :commentable, polymorphic: true
      t.text :text, null: false

      t.timestamps
    end
  end
end
