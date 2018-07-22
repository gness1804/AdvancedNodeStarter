const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = (app) => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.delete('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.deleteOne({
      _user: req.user.id,
      _id: req.params.id,
    });
    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    // const blogsCacheKey = `${req.user.id}Blog`;

    // const cachedBlogs = await client.get(blogsCacheKey);

    // if (cachedBlogs) {
    //   console.log('serving from cache');
    //   return res.send(JSON.parse(cachedBlogs));
    // }

    // console.log('serving from mongodb');

    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);

    // client.set(blogsCacheKey, JSON.stringify(blogs));
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
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
