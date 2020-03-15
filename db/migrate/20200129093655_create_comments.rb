class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :commentable, polymorphic: true
      t.references :quota, foreign_key: true
      t.text :text, null: false

      t.timestamps
    end
  end
end
