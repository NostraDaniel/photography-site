import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';
import { NgxMasonryOptions } from 'ngx-masonry';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  public opened: boolean = false;
  public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
		gutter: 20,
		resize: true,
		initLayout: true,
		fitWidth: true
  };
  public page$;
  public page2;
  public urls: string[] = [
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/72862575_158152188731055_9207099137143881873_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=QYVt4UT9LhsAX8LOCfA&oh=dd8fa3808c03e75d50a446a0019027ec&oe=5EBBCAB4',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/70794121_411798416170430_5569056665743762883_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=DjILqtzyGi0AX8eA-tz&oh=e990aab9738f1b5b17ac55467b3fecb5&oe=5EB962CE',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/47445067_1432948686841937_1367104419265385205_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=7urTE4KxEJwAX-ZIWsp&oh=3d6dbd2f03551e3c3b86079169a2cbe0&oe=5EBAA6C4',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/72862575_158152188731055_9207099137143881873_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=QYVt4UT9LhsAX8LOCfA&oh=dd8fa3808c03e75d50a446a0019027ec&oe=5EBBCAB4',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/70794121_411798416170430_5569056665743762883_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=DjILqtzyGi0AX8eA-tz&oh=e990aab9738f1b5b17ac55467b3fecb5&oe=5EB962CE',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/47445067_1432948686841937_1367104419265385205_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=7urTE4KxEJwAX-ZIWsp&oh=3d6dbd2f03551e3c3b86079169a2cbe0&oe=5EBAA6C4',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/72862575_158152188731055_9207099137143881873_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=QYVt4UT9LhsAX8LOCfA&oh=dd8fa3808c03e75d50a446a0019027ec&oe=5EBBCAB4',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/70794121_411798416170430_5569056665743762883_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=DjILqtzyGi0AX8eA-tz&oh=e990aab9738f1b5b17ac55467b3fecb5&oe=5EB962CE',
    'https://scontent-sof1-1.cdninstagram.com/v/t51.2885-15/e35/47445067_1432948686841937_1367104419265385205_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=7urTE4KxEJwAX-ZIWsp&oh=3d6dbd2f03551e3c3b86079169a2cbe0&oe=5EBAA6C4',
  ];

  constructor(
    private readonly lightbox: Lightbox,
    private readonly route: ActivatedRoute,
    private readonly pagesService: PagesService
  ) { }

  ngOnInit() {
    window.setTimeout(() => {
      this.opened = true;
    }, 1000)

    this.route.params.subscribe(info => {
      this.pagesService.getSinglePage(info.id)
        .subscribe(res => {
          console.log('ot components', res);
        });
    })

    this.page$ = this.route.data.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  ngOnDestroy() {
    this.page$.unsubscribe();
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
