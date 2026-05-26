using System.ComponentModel.DataAnnotations;

namespace BrokenBlogApi.Models

  
{
    public class BlogPost
    {
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        public int AuthorId { get; set; }
    }
}