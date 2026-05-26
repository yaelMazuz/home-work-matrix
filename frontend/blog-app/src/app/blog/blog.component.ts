
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-blog',
  template: `
    <h1>Blog Posts</h1>

    

    <div *ngFor="let post of posts; trackBy: trackByPostId">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <button (click)="viewPost(post.id)">View Details</button>
    </div>

    <h1>Create New Post</h1>
    <form [formGroup]="newPost" (ngSubmit)="createPost()">

  <input formControlName="title" placeholder="Title">
  <div *ngIf="newPost.get('title')?.touched && newPost.get('title')?.invalid">
    Title is required (min 3 chars)
  </div>

  <input formControlName="description" placeholder="Description">
  <div *ngIf="newPost.get('description')?.touched && newPost.get('description')?.invalid">
    Description is required (min 5 chars)
  </div>

  <textarea formControlName="content" placeholder="Content"></textarea>
  <div *ngIf="newPost.get('content')?.touched && newPost.get('content')?.invalid">
    Content is required (min 10 chars)
  </div>

  <button type="submit" (click)="createPost()" [disabled]="newPost.invalid">Submit</button>
</form>
  
  `,
  standalone: true,
   imports: [CommonModule,FormsModule, ReactiveFormsModule],
})
export class BlogComponent implements OnInit {

  posts: any[] = [];
  // postDetails: any = null;
  newPost = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(3)]],
  description: ['', [Validators.required, Validators.minLength(5)]],
  content: ['', [Validators.required, Validators.minLength(10)]],
  });
  postsCount: number=0;

  constructor(private blogService: BlogService, private http: HttpClient,private fb: FormBuilder) { }
 
  //Get posts
  getPosts()
  {
    this.blogService.getPosts().subscribe(posts => {
      this.posts = posts;
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
    this.blogService.createPost(this.newPost.value).subscribe();
  }

  //View post
  viewPost(id: number): void {                               
    this.blogService.getPostById(id).subscribe(post => {
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
