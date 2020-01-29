class Skin < ApplicationRecord
  has_many :quotas, through: :skin_quotas
end
