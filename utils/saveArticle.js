const saveArticleAndRedirect = (path) => {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      console.log(e);
      res.render(`articles/${path}`, { article: article });
    }
  };
};

module.exports = {
  saveArticleAndRedirect,
};
