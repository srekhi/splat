require 'test_helper'

class Api::EmoticonsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get api_emoticons_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_emoticons_edit_url
    assert_response :success
  end

  test "should get update" do
    get api_emoticons_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_emoticons_destroy_url
    assert_response :success
  end

  test "should get show" do
    get api_emoticons_show_url
    assert_response :success
  end

  test "should get create" do
    get api_emoticons_create_url
    assert_response :success
  end

end
