@app
twittarc

@aws
region eu-north-1

@macros
architect/macro-storage-private
add-dynamo-policies
enable-backups

@dynamo-policies
dynamodb:DescribeTable
dynamodb:ExportTableToPointInTime

@scheduled
daily-backup rate(1 day)

@http
get /login
get /logout
get /tweets
post /tweets

@tables
tweets
  accountId *String
  publishedOn **String
  content String
  name String

@enable-backups
tweets

@storage-private
tweets-backup