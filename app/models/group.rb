class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :user_groups
  has_many :user_groups
  validates :name, presence: true
  validates :name, uniqueness: true
end
