let posts = [];
let currentId = 1;

const create = (title, content) => {
    posts.push({ id: currentId++, title, content });
};

const getAll = () => posts;

const getById = (id) => posts.find(post => post.id === parseInt(id));

const update = (id, title, content) => {
    const post = getById(id);
    if (post) {
        post.title = title;
        post.content = content;
    }
};

const deletePost = (id) => {
    posts = posts.filter(post => post.id !== parseInt(id));
};

// Export functions individually for ES module compatibility
export { create, getAll, getById, update, deletePost as delete };
