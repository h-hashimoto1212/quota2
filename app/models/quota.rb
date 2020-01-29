class Quota < ApplicationRecord
  has_many :quotes
  has_many :pictures, as: :imageable
end
