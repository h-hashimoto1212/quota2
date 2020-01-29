class Evaluate < ApplicationRecord
  belongs_to :quota
  belongs_to :evaluatable, polymorphic: true
end
