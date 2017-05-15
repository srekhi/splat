class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login!(@user)
      render "api/shared/user"
    else
      render(
        json: ["Invalid username/password combination"],
        status: 401
      )
    end
	end

  def new
    render :new
  end

  def destroy
    @user = current_user
    if @user
      logout!(@user)
      render "api/shared/user"
    else
      render(
        json: ["Nobody signed in"],
        status: 404
        )
    end
  end
end
