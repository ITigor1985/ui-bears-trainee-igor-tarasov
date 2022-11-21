# ui-bears-trainee-igor-tarasov

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

The project I worked on is designed to organize any work process.
For example, I will take homework for children for the summer. For each school subject, I create a separate column. In which I create cards with job descriptions. After that, I create new columns: in progress, checked by parents, and completed. When starting a task, I drag it to the "in progress" column. While working on the task, I can leave my comments in the description field and also correct the name of the task itself if something does not suit me. After I have completed the task, it moves to the next column and so on until it gets into the "completed" column. This way I always see what I have done and what else needs to be done.
This project is a full stack development.
To implement the front end part, I used Vue Cli. The Vueh library was used to implement the business logic. The axios library was used to query the database. To implement the drag and drop effect, the vuedraggable library was used. External styles were implemented in CSS.
To implement the back end part, I used serverless technologies provided by the Amazon service. The serverless framework was used to work with the service. In the serverless.yml file, I set up AWS Lambda and AWS DynamoDB. My Lambda functions receive data from the front end and send a request to the database to perform one of the CRUD backends.
