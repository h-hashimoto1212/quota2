class Source < ApplicationRecord
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable
  belongs_to :author, optional: true
  has_many :quotes

  validates :name, uniqueness: true, presence: true
end
