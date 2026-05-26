
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from './services/blog.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogStoreService } from './services/blog-store.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
})
export class BlogComponent implements OnInit {

  posts: any[] = [];
  // postDetails: any = null;
  newPost = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(3)]],
  description: [''],
  content: ['', [Validators.required, Validators.minLength(1)]],
  });
  postsCount: number=0;
  posts$ :Observable<any>= this.BlogStoreService.posts$;

  constructor(
    private BlogStoreService:BlogStoreService,
    //private blogService: BlogService,
     private http: HttpClient,private fb: FormBuilder) { }
 
  //Get posts
  getPosts()
  {
    this.BlogStoreService.getPosts().subscribe(posts => {
      this.postsCount=posts.length;
      console.log('Post count:', this.postsCount); 
    });
  }

  //Track by post id
  trackByPostId(index: number, post: any): number {
   return post.id;
  }

  //On init
  ngOnInit() {
    this.getPosts();
  }

  //Create new post
  createPost(): void {
    //Check validation
    if (this.newPost.invalid) return;
    this.BlogStoreService.createPost(this.newPost.value).subscribe({
    next: (res) => {
      //Clear form
      this.newPost.reset();
    },

    //Catch errors
    error: (err) => {
      console.error('Error creating post:', err);
      alert(err.error.errors.Title);
    }
  });
}
  

  //View post
  viewPost(id: number): void {                               
    this.BlogStoreService.getPostById(id).subscribe(post => {
      alert(`Post: ${(post as any).title}, Total: ${this.postsCount} , Author: ${(post as any).AuthorName}`);
    })
  }

  // loadPostDetails(id: number) {
  //   this.blogService.getPostById(id).subscribe(post => {
  //     this.blogService.getPosts().subscribe(allPosts => {
  //       this.postDetails = {
  //         ...post,
  //         totalPosts: allPosts.length,
  //       };
  //     });
  //   });
  // }
  
}
