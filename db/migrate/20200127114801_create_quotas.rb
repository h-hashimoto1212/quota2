class CreateQuotas < ActiveRecord::Migration[5.2]
  def change
    create_table :quotas do |t|
      t.string :name
      t.string :email, unique: true

      t.timestamps
    end
  end
end
