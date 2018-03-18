# ShelfieBot

ShelfieBot is my [Telegram](https://telegram.org/) bot to add articles to my personal Shelfie storage.
Currently, the front-end part of this project, the Shelfie, is still under construction.

## Goals
- Learn how to and play around with creating a Telegram bot.
- Do this in `Node.js`.
- Do a decent job at keeping the source code clean and structured.

## What I Learned
- Learned a lot about the Telegram API.
  - The different end points.
  - How to work with Telegram scenes, although I'm not quite sure whether my implementation was the most proper and scalable way.
  - Discoved a lot more about the Telegram API that I didn't use in this project, like the keyboard markups, invoices, inline queries, and more!
- Played around with different Node.js telegram bot libraries, namely [`telegraf`](https://github.com/telegraf/telegraf) and [`micro-bot`](https://github.com/telegraf/micro-bot).
- I personally think I did a decent job in keeping all the code structured and clean. What I implemented extensively in this project was the usage of destructering for method parameters. I don't quite remember the article that I read about it, but I definitely felt some of the benefits from it. 
  - One concrete example is when I wanted to add more information to processing the articles by acquiring more information through link previewing. All I had to do was add two additional fields in the destructured object at method definition and I was done. :tada:
- I added a testing framework. :tada: Although the tests themselves are definitely not impressive, I learned quite a lot about testing in Node.js, about `mocha`, `chai`, and testing asynchronous code!
- Learned about and deployed this bot to [now](https://zeit.co/).
