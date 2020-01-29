class Quota < ApplicationRecord
  has_many :quotes
  has_many :skins, through: :skin_quotas
  has_many :pictures, as: :imageable
  has_many :evaluates, as: :evaluatable
  has_many :comments
end
