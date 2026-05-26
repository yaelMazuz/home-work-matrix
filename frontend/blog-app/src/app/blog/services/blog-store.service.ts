import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogStoreService {

  private postsSubject = new BehaviorSubject<any[]>([]);
  posts$ = this.postsSubject.asObservable();

  private loadedposts: any[] | null = null;

  constructor(private blogService: BlogService) {}

  getPosts() {
    //If posts loaded
    if (this.loadedposts) {
      return this.posts$;
    }

    //Else http request
    return this.blogService.getPosts().pipe(
      tap(posts => {
        //Save loded posts
        this.loadedposts = posts;
        this.postsSubject.next(posts);
      })
    );
  }

  getPostById(id: number) {
    //If found in loaded array
    const cached = this.loadedposts?.find(p => p.id === id);
    if (cached) {
      return of(cached);
    }
    //Else http request
    return this.blogService.getPostById(id);
  }

  createPost(post: any) {
    //Create post
    return this.blogService.createPost(post).pipe(
      tap((newPost: any) => {
        //Add new post to the list
        this.loadedposts = [ ...(this.loadedposts || []),newPost];
        this.postsSubject.next(this.loadedposts);
      })
    );
  }
}
