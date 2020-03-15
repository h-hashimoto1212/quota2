json.quote do
  json.id @quote.id
  json.text @quote.text
  json.selfquote @quote.selfquote
  json.description @quote.description
  json.userName @quote.quota.name
  json.authorName @quote.author
  json.sourceName @quote.source
  json.comments @quote.comments do |comments|
    json.text comments.text
    json.quota comments.quota.name
    json.date comments.updated_at
  end
end

json.uQuotes @uQuotes do |uQuotes|
  json.id uQuotes.id
  json.text uQuotes.text
  json.selfquote uQuotes.selfquote
  json.description uQuotes.description
  json.userName uQuotes.quota.name
  json.authorName uQuotes.author
  json.sourceName uQuotes.source
  json.comments uQuotes.comments do |comments|
    json.text comments.text
    json.quota comments.quota.name
  end
end

json.aQuotes @aQuotes do |aQuotes|
  json.id aQuotes.id
  json.text aQuotes.text
  json.selfquote aQuotes.selfquote
  json.description aQuotes.description
  json.userName aQuotes.quota.name
  json.authorName aQuotes.author
  json.sourceName aQuotes.source
  json.comments aQuotes.comments do |comments|
    json.text comments.text
    json.quota comments.quota.name
  end
end

json.sQuotes @sQuotes do |sQuotes|
  json.id sQuotes.id
  json.text simple_format(sQuotes.text)
  json.selfquote sQuotes.selfquote
  json.description sQuotes.description
  json.userName sQuotes.quota.name
  json.authorName sQuotes.author
  json.sourceName sQuotes.source
  json.comments sQuotes.comments do |comments|
    json.text comments.text
    json.quota comments.quota.name
  end
end
