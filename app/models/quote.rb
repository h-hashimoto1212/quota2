class Quote < ApplicationRecord
  belongs_to :quota
  belongs_to :document, optional: true
  belongs_to :author, optional: true
  has_many :pictures, as: :imageable
end
