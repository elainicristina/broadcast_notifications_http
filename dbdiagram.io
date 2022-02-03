// https://dbdiagram.io

table users {
  id bigint
  email string
  kind string
  actived boolean
  birth_date date
  webhooks_count integer
  notifications_count integer
  created_at timestamp
  updated_at timestamp
}

table webhooks {
  id bigint
  user_id bigint 
  url string
  created_at timestamp
  updated_at timestamp
}
ref "webhooks":"webhooks"."user_id" - "users"."id"

table notifications {
  id bigint
  user_id bigint 
  message string
  interpolation string
  created_at timestamp
}
ref "notifications":"notifications"."user_id" - "users"."id"
