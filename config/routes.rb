Rails.application.routes.draw do
  root to: 'quotes#show'
  resources :quotes
end
