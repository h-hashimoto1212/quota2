class Document < ApplicationRecord
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable
  belongs_to :authors, optional: true
end
