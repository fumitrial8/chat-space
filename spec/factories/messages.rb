FactoryBot.define do
  factory :message do
    text  {Faker::Movies::HarryPotter.spell}
    image {File.open("#{Rails.root}/public/images/image.jpg")}
    user
    group
  end
end