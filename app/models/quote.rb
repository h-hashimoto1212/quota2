class Quote < ApplicationRecord
  belongs_to :quota
  belongs_to :document
  belongs_to :author
  has_many :pictures, as: :imageable
end
