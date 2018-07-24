const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const deleteUserCache = require('../middlewares/deleteUserCache');

const Blog = mongoose.model('Blog');

module.exports = (app) => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.delete('/api/blogs/:id', requireLogin, deleteUserCache, async (req, res) => {
    const { id } = req.user;
    const blog = await Blog.deleteOne({
      _user: id,
      _id: req.params.id,
    });
    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const { id } = req.user;
    const blogs = await Blog.find({ _user: id }).cache({
      key: id,
    });
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, deleteUserCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
