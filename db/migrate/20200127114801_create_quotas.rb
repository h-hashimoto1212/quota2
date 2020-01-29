class CreateQuotas < ActiveRecord::Migration[5.2]
  def change
    create_table :quotas do |t|
      t.string :name, null:false
      t.string :email, unique: true, null:false

      t.timestamps
    end
  end
end
