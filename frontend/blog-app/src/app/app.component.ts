import { Component } from '@angular/core';
import { BlogComponent } from './blog/blog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [BlogComponent]
})
export class AppComponent {
  title = 'blog-app';
}
