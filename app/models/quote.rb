class Quote < ApplicationRecord
  belongs_to :quota, optional: true
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable, dependent: :destroy

  validates :text, presence: true
end
