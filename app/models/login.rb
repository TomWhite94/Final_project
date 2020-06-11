class Login < ApplicationRecord

    validates :email, {uniqueness: true}
end