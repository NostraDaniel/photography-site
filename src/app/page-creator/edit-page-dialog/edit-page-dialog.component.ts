import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/shared/services/notificator.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from 'src/app/common/classes/upload-adapter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IImage } from 'src/app/common/interfaces/image';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-edit-page-dialog',
  templateUrl: './edit-page-dialog.component.html',
  styleUrls: ['./edit-page-dialog.component.scss']
})
export class EditPageDialogComponent implements OnInit {

  public galleryImages: any[] = [];
  private deletedGalleryImages: IImage[] = [];
  public previewUrl: any = null;
  public fileUploadProgress: string = null;
  public uploadedFilePath: string = null;
  private validImageExtentions: string[] = ['image/jpeg', 'image/jpg', 'image/png','image/gif'];

  public editor = ClassicEditor;
  public pageForm = this.fb.group({
    isPublished:[false],
    title: ['', [ Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    content: ['', [ Validators.required, Validators.minLength(15),Validators.maxLength(10000)]],
    description: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
    isFrontPage: [false],
    gallery: [''],
    deletedGalleryImages: [''],
  });
  public submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private readonly fb: FormBuilder,
    public readonly http: HttpClient,
    private readonly notificator: NotificatorService,
    private readonly pagesService: PagesService
    ) {}
    
  public get title() { return this.pageForm.get('title'); }
  public get content() { return this.pageForm.get('content'); }
  public get description() { return this.pageForm.get('description'); }

  ngOnInit() {
    for (const key in this.data) {
      if(
        key === 'id' ||
        key === 'gallery' ||
        key === 'createdOn' ||
        key === '__gallery__'
        ) {
        continue;
      }

      this.pageForm.controls[key].setValue(this.data[key]);
    }
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, this);
    };
  }
  
  uploadImage(imageFile) {
    if(!imageFile) {
      return new Observable(observer => observer.next({}));
    }

    if(imageFile.hasOwnProperty('id')) {
      return new Observable(observer => observer.next(imageFile));
    }

    if(!this.validateFile(imageFile)) {
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    return this.pagesService.uploadImage(formData) 
  }

  uploadMultipleImages(arrImageFiles) {
    if(arrImageFiles.length === 0) {
      return new Observable(observer => observer.next([]));
    }

    const formData = new FormData();
    
    arrImageFiles.forEach(image => {
      if(image.hasOwnProperty('id')) {
        return;
      }

      if(!this.validateFile(image)) {
        return;
      }

      formData.append('gallery[]', image, image.name);
    });

    return this.pagesService.uploadGalleryImages(formData);
  }

  onSubmit() {
    this.submitted = true;

    if(this.pageForm.valid) {
      const newImgGallery = this.galleryImages.filter(img => !img.hasOwnProperty('id'));

      this.uploadMultipleImages(newImgGallery).subscribe((galleryRes) => {
        const joinedImgArrays = this.galleryImages.filter(img => img.hasOwnProperty('id')).concat(galleryRes);
        this.pageForm.controls['gallery'].setValue(joinedImgArrays);
        this.pageForm.controls['deletedGalleryImages'].setValue(this.deletedGalleryImages);

        this.pagesService.updatePost(this.pageForm.value, this.data.id).subscribe(postRes => {
          this.notificator.success('Edit was successful!');
          this.dialogRef.close(postRes);
        },
        (errPost) => {
          errPost.error.message.forEach(errObj=> {
            for (const key in errObj.constraints) {
              this.notificator.error(errObj.constraints[key]);
            }
          });
          this.dialogRef.close();
        });
      },
      (errGallery) => {
        this.notificator.error('There was problem with uploading the gallery images.');
        this.dialogRef.close();
      });
    }
  }

  changeGalleryFiles(pictures) {
    this.galleryImages = pictures;
  }

  addDeletedImg(deletedPictures) {
    this.deletedGalleryImages = deletedPictures;
  }

  // Validation For Images
  validateFile(file): boolean {
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
