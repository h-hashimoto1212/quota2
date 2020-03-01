json.quote do
  json.id @quote.id
  json.text @quote.text
  json.selfquote @quote.selfquote
  json.description @quote.description
  json.userName @quote.quota.name
end

json.uQuotes @uQuotes do |uQuotes|
  json.id uQuotes.id
  json.text uQuotes.text
  json.selfquote uQuotes.selfquote
  json.description uQuotes.description
  json.userName uQuotes.quota.name
end