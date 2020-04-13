import { Component, OnInit } from '@angular/core';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';
import { Lightbox } from 'ngx-lightbox';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  opened: boolean = false;
  public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
		gutter: 20,
		resize: true,
		initLayout: true,
		fitWidth: true
	};
  // private masonryImages: string[];
  public urls: string[] = [
    '../../../assets/test/iliqna2.jpg',
    '../../../assets/test/iliqna3.jpg',
     '../../../assets/images/slider/1.jpg',
     'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/80679287_837204556739807_5050262635521191128_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=9goTzKIQZ3sAX-lmZla&oh=86940a47e7db14ab7f5256e0a4aa466f&oe=5EB88A70',
     '../../../assets/images/slider/1.jpg',
     'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/82240857_152016589550553_3496631165571886773_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=OFNlVhTbDbAAX9QUTsl&oh=20bac89be4c6095e341593002b192a54&oe=5EBAEEFE',
     '../../../assets/test/iliqna4.jpg',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/75330261_562725841216069_9075476546494668895_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=Ro-i1flbHUYAX9TZ8ev&oh=fc5f8aff947a957896e4da5d7ced15b0&oe=5EB87B1D',
    '../../../assets/test/iliqna.jpg',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/72862575_158152188731055_9207099137143881873_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=QYVt4UT9LhsAX8LOCfA&oh=dd8fa3808c03e75d50a446a0019027ec&oe=5EBBCAB4',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/70794121_411798416170430_5569056665743762883_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=DjILqtzyGi0AX8eA-tz&oh=e990aab9738f1b5b17ac55467b3fecb5&oe=5EB962CE',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/47445067_1432948686841937_1367104419265385205_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=7urTE4KxEJwAX-ZIWsp&oh=3d6dbd2f03551e3c3b86079169a2cbe0&oe=5EBAA6C4',
  ];

  constructor(
    private readonly lightbox: Lightbox
  ) { }

  ngOnInit() {
    window.setTimeout(() => {
      this.opened = true;
    }, 1000)
  }

  public get images(): IMasonryGalleryImage[] {
    return this.urls.map(m => <IMasonryGalleryImage>{
      imageUrl: m
    });
  }

  // clickedImage(event): void {
  //   const gallery = this.post['__gallery__'];
  //   const index = gallery.findIndex(image => image['src'] === event['imageUrl']);

  //   this.lightbox.open(this.post['__gallery__'], index);
  // }
}
