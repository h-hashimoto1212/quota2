# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Quota.create(
  name: "Quota",
  email: "test@quota.com"
)

9.times do
  Quota.create(
    name: "#{Faker::Name.first_name}#{Faker::Number.number(digits: 4)}",
    email: Faker::Internet.email
  )
end

10.times do
  Quote.create(
    text: Faker::Quote.famous_last_words,
    description: nil
    selfquote: true,
    quota_id: Faker::Number.within(range: 1..10),
    author_id: nil,
    document_id: nil
  )
end

Document.create(
  id: 1,
  name: "Dumb And Dumber",
  date: "1994"
)

5.times do
  Quote.create(
    text: Faker::TvShows::DumbAndDumber.quote,
    description: nil
    selfquote: false,
    quota_id: Faker::Number.within(range: 2..10),
    author_id: nil,
    document_id: 1
  )
end



