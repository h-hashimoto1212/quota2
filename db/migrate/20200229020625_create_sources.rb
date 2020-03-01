class CreateSources < ActiveRecord::Migration[5.2]
  def change
    create_table :sources do |t|
      t.string :name, null: false
      t.string :date

      t.timestamps
    end

    add_reference :quotes, :source, foreign_key: true
  end
end
