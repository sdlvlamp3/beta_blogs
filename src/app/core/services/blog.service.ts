import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Blog } from '../../shared/models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  // get request to send to /blogs
  getBlogs(): Observable<Blog[]>{
    return this.http.get<Blog[]>(`${environment.apiUrl}/blogs`)
  }

}