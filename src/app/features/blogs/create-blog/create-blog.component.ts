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
  selectedFile: File | null = null;

  constructor(private blogService: BlogService, private router: Router) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  createBlog() {
    if (this.blogForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.blogForm.get('title')!.value!);
      formData.append('content', this.blogForm.get('content')!.value!);
      formData.append('cover_image', this.selectedFile, this.selectedFile.name);

      this.blogService.createBlog(formData).subscribe({
        next: (res) => {
          console.log('Blog created!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
