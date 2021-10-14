
const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => (
    total + blog['likes']
  ), 0)
}

const getFavourite = (blogs) => {
  if(blogs.length === 0)
    return null

  return blogs.reduce((mostLikes, newBlog) => (
    newBlog['likes'] > mostLikes['likes'] ? newBlog : mostLikes
  ), blogs[0])
}

module.exports = {
  totalLikes, getFavourite
}