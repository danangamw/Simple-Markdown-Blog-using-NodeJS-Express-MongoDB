const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const marked = require('marked');
const articleController = require('../controllers/article');
const { saveArticleAndRedirect } = require('../utils/saveArticle');

// get new article page
router.get('/new', articleController.getNewArticle);

// get edit page
router.get('/edit/:id', articleController.getEditArticle);

// get single article
router.get('/:slug', articleController.getSingleArticle);

// post new article
router.post(
  '/',
  articleController.postNewArticle,
  saveArticleAndRedirect('new')
);

// edit and delete article
router
  .route('/:id')
  .put(articleController.editArticle, saveArticleAndRedirect('edit'))
  .delete(articleController.deleteArticle);

module.exports = router;
