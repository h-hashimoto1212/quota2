class CreateEvaluates < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluates do |t|
      t.references :quota, foreign_key: true
      t.references :evaluatable, polymorphic: true
      t.boolean :like
      t.boolean :dislike

      t.timestamps
    end
  end
end
