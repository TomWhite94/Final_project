Rails.application.routes.draw do
  
    # namespace :v1, defaults: { format: 'json'} do
    # # get 'login', to: 'login#index'
    # # post 'login', to: 'login#create'
    # resources :login
    


  # root 'static#index'
  
  resources :users, only: [:create, :show, :index]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  get '*path', to: 'homepage#index'

  resources :gigs, only: [:create, :show, :destroy]
  
  
end
