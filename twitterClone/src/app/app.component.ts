import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Makes it standalone (no app.module.ts needed)
  imports: [HttpClientModule, FormsModule,CommonModule],  // ✅ Import necessary modules here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  selectedUserId: number = 1;
  selectedPostId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')

      .subscribe(users => {
        console.log('Users', users);
        
        this.users = users;
        this.fetchPosts(this.selectedUserId);
      }, error => {
        console.error('Error Fetching users', error)
      });
  }

  fetchPosts(userId: number) {
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .subscribe(posts => {
        this.posts = posts;
        this.selectedPostId = posts.length > 0 ? posts[0].id : null;
        if (this.selectedPostId) this.fetchComments(this.selectedPostId);
      });
  }

  fetchComments(postId: number) {
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .subscribe(comments => {
        this.comments = comments;
      });
  }
}


