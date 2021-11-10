# Tech Blog

## Description
When the user visits the site for the first time, they are presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in.

When the user clicks on the homepage option, they are taken to the homepage, which includes any existing blog posts.

The user must be logged in to view any other navigation links. If they are not logged in, they are prompted to log in with the option to sign up instead.

The user can sign up with a username, email and password. The user's credentials are saved and they are logged in and is able to use those credentials again to log in when they choose to revist the site.

If the user is logged in they are able to click and view their dashboard, which includes all their previously made blog posts and an option to add a new blog post.

When they click on any blog post, they are able to comment on that blog post. They are prompted to fill a form with the contents of their comment. When they submit the comment form, their comment is displayed when the original blog post is clicked.

When the user clicks on the option to add a new blog post, they are prompted to fill a form with the contents of their blog post. When they submit the blog form, their blog is displayed on the homepage and on their dashboard.


## Installation
```bash
npm i
```

[express-handlebars](https://www.npmjs.com/package/express-handlebars)

[MySQL2](https://www.npmjs.com/package/mysql2)

[Sequelize](https://www.npmjs.com/package/sequelize)

[dotenv package](https://www.npmjs.com/package/dotenv)

[bcrypt package](https://www.npmjs.com/package/bcrypt)

[express-session](https://www.npmjs.com/package/express-session)

[connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)


![homepage](./assets/homepage.png)
## Live Link

[heroku](https://floating-dusk-39369.herokuapp.com/)