Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users do
      resources :channels, only: [:index]
    end
    resources :channels, only: [:create, :destroy, :show]
    resource :session
  end

end
