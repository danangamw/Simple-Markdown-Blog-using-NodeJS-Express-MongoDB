const Article = require('../models/article');
const marked = require('marked');

const getNewArticle = (req, res) => {
  res.render('articles/new', { article: new Article() });
};

const getEditArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article: new Article() });
};

const getSingleArticle = async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article === null) res.redirect('/');
  res.render('articles/show', {
    article: article,
  });
};

const postNewArticle = async (req, res, next) => {
  req.article = new Article();
  next();
};

const editArticle = async (req, res) => {
  await Article.findById(req.params.id);
  next();
};

const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

module.exports = {
  getNewArticle,
  editArticle,
  getSingleArticle,
  postNewArticle,
  editArticle,
  getEditArticle,
  deleteArticle,
};
