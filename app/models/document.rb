class Document < ApplicationRecord
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  belongs_to :authors, optional: true
end
