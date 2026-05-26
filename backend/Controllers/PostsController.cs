using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BrokenBlogApi.Models;
using BrokenBlogApi.Services;

namespace BrokenBlogApi.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostsController : ControllerBase
    {   private static int totalCalls = 0;
        private readonly PostsService _postsService;

        public PostsController(PostsService postsService)
        {
            _postsService = postsService;
        }


        //Get all post
        [HttpGet]
        public IActionResult GetPosts()
        {
            var posts= _postsService.GetAll();
            totalCalls ++; 
            return Ok(posts);
        }

        //Get single post data
        [HttpGet("{id}")]
        public IActionResult GetPost(int id)
        {
            var result = _postsService.GetPostWithAuthor(id);

            if (result == null)
                return NotFound(new { Message = "Post not found" });

            return Ok(result);
        }

        //Create new post
        [HttpPost]
        public IActionResult CreatePost([FromBody] BlogPost post)
        {
            //Validate post
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //Create post
            var created = _postsService.Create(post);
            return Ok(created);
        }
    }

 
}
