Rails.application.routes.draw do
  
    namespace :v1, defaults: { format: 'json'} do
    get 'login', to: 'login#index'
  end
  root 'static#index'
 
end
