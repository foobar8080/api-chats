# API chats

## Fork, clone, install and run app

Before you begin, ensure you have Node.js installed (my version 16.15.1).

- go to https://github.com/foobar8080/api-chats
- click on the "Fork" button at the top-right corner - this will create a copy of the repository under your GitHub account
- copy the URL of your forked repository (https://github.com/<YOUR_GITHUB_ACCOUNT>/api-chats.git)
- run `git clone https://github.com/<YOUR_GITHUB_ACCOUNT>/api-chats.git`
- run `cd api-chats`
- run `git fetch origin develop`
- run `git checkout develop`
- run `git pull origin develop`
- run `npm i`
- run `npm run dev`
- go to http://localhost:5002/health to check is the app working

## Commands

- Run the app in development:

```npm run dev```

- Run the app in production:

```npm run prod```

- Build the app for production:

```npm run build```

- Run the linter to check code:

```npm run lint```

## Important

- [App development rules](https://github.com/foobar8080/api-chats/tree/develop/.app/development-rules)
- [App docs](https://github.com/foobar8080/api-chats/tree/develop/.app/docs) 
- [TO-DO list](https://github.com/foobar8080/api-chats/tree/develop/.app/to-do) 
