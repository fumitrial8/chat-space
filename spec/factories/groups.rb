FactoryBot.define do
  factory :group do
    name                   {Faker::Game.unique.title}
  end
end