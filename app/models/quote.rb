class Quote < ApplicationRecord
  belongs_to :quota
  has_one :document
  accepts_nested_attributes_for :document
  has_one :author
  accepts_nested_attributes_for :author
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable
end
