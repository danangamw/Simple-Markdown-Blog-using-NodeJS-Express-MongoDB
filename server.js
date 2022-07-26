require('dotenv').config();
const express = require('express');
const articleRouter = require('./routes/article');
const Article = require('./models/article');
const methodOverride = require('method-override');
const connectDB = require('./db/connect');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// routes
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'desc',
  });
  res.render(`articles/index`, { articles: articles });
});

const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening at port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
