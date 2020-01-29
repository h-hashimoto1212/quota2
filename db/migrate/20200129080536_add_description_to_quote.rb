class AddDescriptionToQuote < ActiveRecord::Migration[5.2]
  def change
    add_column :quotes, :description, :text
  end
end
