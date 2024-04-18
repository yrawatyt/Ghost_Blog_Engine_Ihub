const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to get list of all published blogs from Ghost Content API
router.get('/blogs', async (req, res) => {
  try {
    // Make a GET request to Ghost Content API to fetch all published posts
    const response = await axios.get('http://127.0.0.1:2368/ghost/api/content/posts/', {
      params: {
        key: '189223b2eb069c55948c0dc722',
        filter: 'visibility:public',
        formats: 'mobiledoc'
      }
    });
    const blogs = response.data.posts;
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get list of blogs published in the last one week from Ghost Content API
router.get('/blogs/lastweek', async (req, res) => {
  try {
    // Calculate date for one week ago
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    // Make a GET request to Ghost Content API to fetch posts published in the last one week
    const response = await axios.get('http://127.0.0.1:2368/ghost/api/content/posts', {
      params: {
        key: '189223b2eb069c55948c0dc722',
        filter: `visibility:public+published_at:>='${oneWeekAgo}'`,
        formats: 'mobiledoc'
      }
    });
    const recentBlogs = response.data.posts;
    res.json(recentBlogs);
  } catch (error) {
    console.error('Error fetching recent blogs:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get the content of a blog by ID or Blog Title from Ghost Content API
router.get('/blogs/:idOrTitle', async (req, res) => {
  try {
    const idOrTitle = req.params.idOrTitle;
    // Make a GET request to Ghost Content API to fetch a specific post by ID or Title
    const response = await axios.get(`http://127.0.0.1:2368/ghost/api/content/posts/${idOrTitle}`, {
      params: {
        key: '189223b2eb069c55948c0dc722',
        formats: 'mobiledoc'
      }
    });
    const blog = response.data.posts[0];
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get the content of a blog by ID or Blog Title from Ghost Content API
router.get('/blogs/title/:idOrTitle', async (req, res) => {
  try {
    const idOrTitle = req.params.idOrTitle;
    // Make a GET request to Ghost Content API to fetch a specific post by ID or Title
    const response = await axios.get(`http://127.0.0.1:2368/ghost/api/content/posts/slug/${idOrTitle}`, {
      params: {
        key: '189223b2eb069c55948c0dc722',
        formats: 'mobiledoc'
      }
    });
    const blog = response.data.posts[0];
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
