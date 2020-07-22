class Gig < ApplicationRecord
    # has_and_belongs_to_many :users
    validates :gigId, uniqueness: true
end
