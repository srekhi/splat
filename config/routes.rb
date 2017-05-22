Rails.application.routes.draw do

  get 'notifications/create'

  get 'notifications/destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users do
      resources :channels, only: [:index]
      resources :notifications, only: [:index]
    end
    resources :channels, only: [:create, :destroy, :show] do
      resources :messages, only: [:index]
    end
    resources :messages, except: [:index]
    resources :emoticons, except: [:new, :edit]

    resources :channels, only: [:show] do #display emoticons for a specific channel
      resources :emoticons, only: [:index]
    end
    resources :notifications, only: [:create, :destroy]
    resource :session
  end

  mount ActionCable.server => '/cable'

end
