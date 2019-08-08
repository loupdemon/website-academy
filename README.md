# Ouracademy

> Ouracademy is an organization that promoves the education in software development throught blog posts & videos 😃.

---

## How write a post

- Clone this repository

- Install & Run it following [this steps](#development)

- Create .env file (like env.sample file) and put your token there, for get your token see this link: https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line

- Run `npm run new-post` for create a new post

- Start writing

- If you are a new author (put your information) in authors.yaml file.

- Commit your post (follow this [guideline](#guide-for-commit-messages))

- Send a pull request

### Guide for commit messages

We use [commit lint](https://conventional-changelog.github.io/commitlint/#/) in order to have a standard for commit messages. So if you create or update the content of a blog post, please use the `docs` type in your commit message, for example a commit message like `docs: new "post title"` is ok.

Also we use the `docs` type in our commit messages, to show a change history of every post (see `<History/>` component in `posts/template.js`).

---

## Development

```bash
npm install
npm run develop
```

Your site will run at `http://localhost:8000`!

> Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data.

### Some notes..🧐

We highly recommend that you install the recommended extensions if you use VS Code. It will make your development sweet 🍰

### Resources

This project use Gatsby. See more of it in its awesome[tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql), it has very useful resources not only to learn Gatsby but also GraphQL, React & plugins for any purpose...

If you don't know MDX, well it's just markdown & with JSX. So you could import components if you needed.

---

## License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
