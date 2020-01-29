class Document < ApplicationRecord
  has_many :pictures, as: :imageable
end
