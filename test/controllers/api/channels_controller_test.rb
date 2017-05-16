require 'test_helper'

class Api::ChannelsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get api_channels_new_url
    assert_response :success
  end

  test "should get create" do
    get api_channels_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_channels_destroy_url
    assert_response :success
  end

end
