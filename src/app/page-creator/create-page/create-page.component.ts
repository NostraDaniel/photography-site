import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UploadAdapter } from 'src/app/common/classes/upload-adapter';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {

  public galleryImages: any = [];
  public previewUrl:any = null;
  public fileUploadProgress: string = null;
  public uploadedFilePath: string = null;
  private validImageExtentions: string[] = ['image/jpeg', 'image/jpg', 'image/png','image/gif'];

  public editor = ClassicEditor;
  public postForm = this.fb.group({
    isPublished:[false],
    title: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    content: ['', [ Validators.required, Validators.minLength(15),Validators.maxLength(10000)]],
    description: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
    isFrontPage: [false],
    frontImage: [''],
    gallery: ['']
  });
  public submitted: boolean = false;

  constructor(
    private readonly router: Router,    private readonly fb: FormBuilder,
    private readonly notificator: NotificatorService,
    private readonly pagesService: PagesService
  ) {}

  public get title() { return this.postForm.get('title'); }
  public get content() { return this.postForm.get('content'); }
  public get description() { return this.postForm.get('description'); }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, this);
    };
  }

  uploadImage(imageFile) {
    if(!imageFile) {
      return new Observable(observer => observer.next({}));
    }

    if(!this.validateFile(imageFile)) {
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    return this.pagesService.uploadImage(formData);
  }

  uploadMultipleImages(arrImageFiles) {
    if(arrImageFiles.length === 0) {
      return new Observable(observer => observer.next([]));
    }

    const formData = new FormData();
    
    arrImageFiles.forEach(image => {
      if(!this.validateFile(image)) {
        return;
      }

      formData.append('gallery[]', image, image.name);
    });

    return this.pagesService.uploadGalleryImages(formData);
  } 

  onSubmit() {
    this.submitted = true;

    if(this.postForm.valid) {
      this.uploadMultipleImages(this.galleryImages).subscribe((galleryRes) => {
        this.postForm.controls['gallery'].setValue(galleryRes);

        this.pagesService.createPost(this.postForm.value).subscribe(postRes => {
          this.router.navigate([`blog/post/${postRes['id']}`]);
        },
        (err) => {
          err.error.message.forEach(errObj=> {
            for (const key in errObj.constraints) {
              this.notificator.error(errObj.constraints[key]);
            }
          });
        });
      },
      (err) => {
        this.notificator.error('There was problem with uploading the gallery images.');
      });
    }
  }

  changeGalleryFiles(pictures) {
    this.galleryImages = pictures;
  }

  // Validation For Images
  validateFile(file) {
    if (!!file && file['size'] > 10000000) {
      this.notificator.error("File can not be larger than 10 MB");
      
      return false;
    }

    if (!!file && !this.validImageExtentions.includes(file['type'])) {
      this.notificator.error("Invalid file format.");
       
      return false;
    }
    return true;
  }
}
