@app
twittarc

@http
# auth
get /login
get /logout

# tweets
get /tweets
post /tweets

@tables
tweets
  accountId *String
  publishedOn **String
  content String
  name String

@aws
region eu-north-1
  