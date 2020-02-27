class Document < ApplicationRecord
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments, as: :commentable
  belongs_to :author, optional: true
  belongs_to :quote, optional: true
end
