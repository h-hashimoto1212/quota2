class Quote < ApplicationRecord
  belongs_to :quota
  belongs_to :document, optional: true
  belongs_to :author, optional: true
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
end
