class Quote < ApplicationRecord
  belongs_to :quota, optional: true
  belongs_to :source, optional: true
  accepts_nested_attributes_for :source
  belongs_to :author, optional: true
  accepts_nested_attributes_for :author
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable

  validates :text, presence: true
end
