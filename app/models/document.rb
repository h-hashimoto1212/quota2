class Document < ApplicationRecord
  has_many :pictures, as: :imageable
  belongs_to :authors, optional: true
end
