class Comment < ApplicationRecord
  belongs_to :quota
  belongs_to :commentable, polymorphic: true
end
