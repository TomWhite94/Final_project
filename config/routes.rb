Rails.application.routes.draw do
  
    namespace :v1, defaults: { format: 'json'} do
    # get 'login', to: 'login#index'
    # post 'login', to: 'login#create'
    resources :login
    
  end
  root 'static#index'
  get 'homepage', to: 'homepage#index'
  
  
end
