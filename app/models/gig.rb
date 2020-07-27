class Gig < ApplicationRecord
    # has_and_belongs_to_many :users
    validates_uniqueness_of :gigId, scope: [:userId]
end
