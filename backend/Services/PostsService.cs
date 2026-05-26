using BrokenBlogApi.Models;

namespace BrokenBlogApi.Services
{
    public class PostsService
    {
        //Blog list
        private static List<BlogPost> Posts = new List<BlogPost>
        {
            new BlogPost { Id = 1, Title = "First Post", Description = "Description of first post", Content = "Content of first post" },
            new BlogPost { Id = 2, Title = "Second Post", Description = "Description of second post", Content = "Content of second post" }
        };

        //Auth list
        private static List<Author> Authors = new List<Author>
        {
             new Author { Id = 1, Name = "John" },
             new Author { Id = 2, Name = "Jane" }
        };

        //Get all posts
        public List<BlogPost> GetAll()
        {
            return Posts;
        }

        //Get post by id
        public BlogPost? GetById(int id)
        {
            return Posts.FirstOrDefault(p => p.Id == id);
        }


        //Get post with author
        public PostDto? GetPostWithAuthor(int id)
        {
            var post = GetById(id);
            if (post == null) return null;

            var author = Authors.FirstOrDefault(a => a.Id == post.AuthorId);

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Description = post.Description,
                Content = post.Content,
                AuthorName = author?.Name
            };
        }

        //Create new  post
        public PostDto Create(BlogPost post)
        {
           

            var newPost = new BlogPost
            {
                Id = Posts.Count == 0 ? 1 : Posts.Max(x => x.Id) + 1,
                Title = post.Title,
                Description = post.Description,
                Content = post.Content,
                AuthorId= post.AuthorId
            };

            Posts.Add(newPost);

            return new PostDto
            {
                Id = newPost.Id,
                Title = newPost.Title,
                Description = newPost.Description,
                Content = newPost.Content,
                AuthorName = null
            };
        }
    }
}
