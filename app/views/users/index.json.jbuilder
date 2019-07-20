json.array! @users do |product|
  json.name   user.name
  json.id     product.id
  json.title  product.title
  json.image  product.image_url
  json.detail product.detail
end