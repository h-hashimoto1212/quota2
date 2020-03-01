class AddRefsToQuote < ActiveRecord::Migration[5.2]
  def change
    add_reference :quotes, :author, foreign_key: true
  end
end
