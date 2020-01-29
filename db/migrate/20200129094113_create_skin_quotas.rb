class CreateSkinQuotas < ActiveRecord::Migration[5.2]
  def change
    create_table :skin_quotas do |t|
      t.references :skin, foreign_key: true
      t.references :quota, foreign_key: true

      t.timestamps
    end
  end
end
