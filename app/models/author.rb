class Author < ApplicationRecord
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable
  has_many :quotes

  validates :name, presence: true
end
