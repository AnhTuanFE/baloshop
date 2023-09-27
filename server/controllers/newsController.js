import news from '../Models/NewsModel.js';

const getListNews = async (req, res) => {
    const News = await news.find({}).sort({ _id: -1 });
    res.json(News);
};
const getNewsById = async (req, res) => {
    const News = await news.findById(req.params.id);
    const Allnews = await news.find({});
    const getNews = Allnews.find((news) => news.content == News.content);
    res.json(getNews);
};
const deleteNews = async (req, res) => {
    const News = await news.findById(req.params.id);
    if (News) {
        await News.remove();
        res.json({ message: 'xóa thành công' });
    } else {
        res.status(404);
        throw new Error('news not Found');
    }
};

const addNews = async (req, res) => {
    const { nameUser, title, image, content } = req.body;
    if (nameUser == '') {
        res.status(400);
        throw new Error('Vui lòng nhập đầy đủ thông tin');
    }
    if (title == '') {
        res.status(400);
        throw new Error('Vui lòng nhập đầy đủ thông tin');
    }
    if (image == '') {
        res.status(400);
        throw new Error('Vui lòng nhập đầy đủ thông tin');
    }
    if (content == '') {
        res.status(400);
        throw new Error('Vui lòng nhập đầy đủ thông tin');
    }
    const News = new news({
        nameUser,
        title,
        image,
        content,
    });
    if (News) {
        const createdNews = await News.save();
        res.status(201).json(createdNews);
    } else {
        res.status(400);
        throw new Error("Can't add news");
    }
};
const updateNews = async (req, res) => {
    const { nameUser, title, image, content } = req.body;
    const News = await news.findById(req.params.id);
    if (News) {
        News.nameUser = nameUser || News.nameUser;
        News.title = title || News.title;
        News.image = image || News.image;
        News.content = content || News.content;

        const updateNews = await News.save();
        res.json(updateNews);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};
const newsController = {
    getListNews,
    getNewsById,
    deleteNews,
    addNews,
    updateNews,
};
export default newsController;
