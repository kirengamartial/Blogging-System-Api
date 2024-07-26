import { Router} from 'express'
import { getBlog, getAllBlogs, createBlog, updateBlog, deleteBlog } from '../controller/blogController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.post('/create',checkAuth, createBlog)
router.put('/edit/:id',checkAuth, updateBlog)
router.delete('/delete/:id',checkAuth, deleteBlog)

export default router