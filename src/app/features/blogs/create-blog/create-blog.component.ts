import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../../../shared/models/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent {
  blogForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(private blogService: BlogService, private router: Router) {}

  createBlog() {
    this.blogService.createBlog(this.blogForm.value).subscribe({
      next: (res) => {
        console.log('Blog created!');
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
