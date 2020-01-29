class SkinQuota < ApplicationRecord
  belongs_to :skin
  belongs_to :quota, optional: true
end
