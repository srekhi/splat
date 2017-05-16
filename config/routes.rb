Rails.application.routes.draw do
  namespace :api do
    get 'channels/new'
  end

  namespace :api do
    get 'channels/create'
  end

  namespace :api do
    get 'channels/destroy'
  end

  get 'channels/new'

  get 'channels/create'

  get 'channels/destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users
    resource :session
  end
  
end
