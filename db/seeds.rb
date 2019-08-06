# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

100.times do |number|
  name = Faker::Internet.username
  email = Faker::Internet.free_email(name: name)
  password = "11111111"
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password)
end