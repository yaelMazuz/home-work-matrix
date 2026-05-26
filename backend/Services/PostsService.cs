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
        public object? GetPostWithAuthor(int id)
        {
            var post = GetById(id);
            if (post == null) return null;

            var author = Authors.FirstOrDefault(a => a.Id == post.AuthorId);

            return new
            {
                post.Id,
                post.Title,
                post.Description,
                post.Content,
                AuthorName = author?.Name
            };
        }

        //Create new  post
        public BlogPost Create(BlogPost post)
        {
            post.Id = Posts.Count + 1;
            Posts.Add(post);
            return post;
        }
    }
}
