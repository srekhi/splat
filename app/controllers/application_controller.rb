class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def logged_in?
    current_user
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def verify_logged_in
    redirect_to new_session_url unless current_user
  end

  def login!(user)
    session[:session_token] = user.session_token
  end

  def logout!(user)
    user.reset_session_token!
    session[:session_token] = nil
  end

  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar_url)
  end
end
