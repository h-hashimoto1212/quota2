class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.text :text, null:false
      t.string :author
      t.string :source
      t.string :date
      
      t.boolean :selfquote

      t.timestamps
    end
  end
end
