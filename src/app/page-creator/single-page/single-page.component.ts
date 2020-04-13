import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/core/services/pages.service';
import { IPage } from 'src/app/common/interfaces/page';
import { Lightbox } from 'ngx-lightbox';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {

  private post: IPage;
  private masonryImages: string[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pagesService: PagesService,
    private readonly lightbox: Lightbox
  ) { }

  open(index: number): void {
    console.log(this.post['__gallery__'][index]);
  }

  close(): void {
    this.lightbox.close();
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.post = data.post;
        this.masonryImages = data.post.__gallery__.map(image => image.src);
      }
    );
  }

  public get images(): IMasonryGalleryImage[] {
    return this.masonryImages.map(m => <IMasonryGalleryImage>{
      imageUrl: m
    });
  }

  clickedImage(event): void {
    const gallery = this.post['__gallery__'];
    const index = gallery.findIndex(image => image['src'] === event['imageUrl']);

    this.lightbox.open(this.post['__gallery__'], index);
  }
}
