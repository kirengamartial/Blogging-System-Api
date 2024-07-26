import Blog from "../models/blogModel.js";

const getBlog = async(req, res) => {
try {
    const { id } = req.params

    const blog = await Blog.findById(id)
    res.status(200).json({
        _id: blog._id,
        title: blog.title,
        description: blog.description
    })
} catch (error) {
  console.log(error)   
  res.status(500).json({message: error})
}
}

const getAllBlogs = async(req, res) => {
try {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
} catch (error) {
    console.log(error)
    res.status(200).json(error)
}
}


const checkError = (err) => {
    const error = { title: '', description: ''}
    Object.values(err.errors).forEach(({properties}) => {
      if(properties) {
        if(properties.path === 'title')  error['title'] = properties.message
        if(properties.path === 'description')  error['description'] = properties.message
      }
    })
     return {message: error}
}


const createBlog = async(req, res) => {
    try {
        const {title, description} = req.body

        const blog = await Blog.create({
                        title,
                        description
                                     })

         if(blog) {
          res.status(200).json(blog)
           }

    } catch (error) {
        const errorMessage =  checkError(error)
        res.status(500).json({message:'Invalid Title or Description'})
    }

}

const updateBlog = async(req, res) => {
try {
    const { id } = req.params
    const {title, description} = req.body

    const blog = await Blog.findById(id)

    if(blog) {
        blog.title = title || blog.title
        blog.description = description || blog.description

        const updatedBlog = await blog.save()

        res.status(200).json(updatedBlog)
    }

} catch (error) {
  res.status(500).json(error)
  console.log({message: error})   
}
}

const deleteBlog = async(req, res) => {
try {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)

    res.status(200).json({message: 'deleted successfully', _id: id})
} catch (error) {
    res.status(500).json(error)
    console.log(error)
}
}

export {
    getBlog,
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog
}