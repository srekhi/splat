class Rack::Attack
  # your custom configuration...
  blacklist('block ip') do |req|
    req.ip == '100.11.248.33'
  end
end
