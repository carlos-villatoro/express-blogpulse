let express = require('express')
const { redirect } = require('express/lib/response')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then(async (article) => {
    if (!article) throw Error()
    // console.log(article.author)
    console.log(article)
    res.render('articles/show', { 
      article: article,
      articleComments: article.comments
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST /articles/:id 
// router.post('/:id', async (req,res)=>{
//  try{
//    console.log(req.body.name)
//   const newComment = await db.comment.create({
//     where: {
//       name: req.body.name,
//       content: req.body.content,
//       articleId: req.params.id
//     }
//   })
//   console.log(newComment)
//   // res.redirect('articles/:id')
//  } catch (err){
//    console.log(err)
//  }
// })



module.exports = router
