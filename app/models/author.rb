class Author < ApplicationRecord
  has_many :pictures, as: :imageable
end
