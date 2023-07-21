AUTH Microservice

npx sequelize model:generate --name User --attributes email:string,password:string

npx sequelize model:generate --name Role --attributes name:string

allowNull: false

1:N
User have many roles
A role will belong to many users

After through

npx sequelize db:migrate

