FactoryBot.define do
  factory :user do
    name                   {Faker::Movies::HarryPotter.character}
    email                  {Faker::Internet.unique.email}
    password               {Faker::Internet.password(8)}
    password_confirmation  {password}
    
    after(:create) do |user|
      temp_group = create(:group)
      create(:message, user:user, group: temp_group)
      create(:user_group, user:user, group: temp_group)

    end
  end
end