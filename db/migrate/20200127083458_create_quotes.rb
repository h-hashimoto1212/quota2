class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.text :text, null:false
      t.boolean :selfquote

      t.timestamps
    end
  end
end
