class AddReferencesToQuotes < ActiveRecord::Migration[5.2]
  def change
    change_table :quotes do |t|
      t.references :quota, foreign_key: true
    end
  end
end
