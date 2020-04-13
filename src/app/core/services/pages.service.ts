import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPage } from 'src/app/common/interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private readonly defautlImageUrl: string = '../../../assets/images/branding-small.png';

  constructor(
    private readonly http: HttpClient
  ) {}


  public getSinglePost(id: string): Observable<IPage> {
    return this.http.get<IPage>(`http://localhost:4202/pages/${id}`);
  }

  public getAllPages(pageIndex = 1, pageSize = 12, filter = ''): Observable<{pagesCount: number, pages: IPage[]}> {
    return this.http.get<{pagesCount: number, pages: IPage[]}>(`http://localhost:4202/pages?page=${pageIndex}&pages_per_page=${pageSize}&filter=${filter}`);
  };

  public getFrontPagePosts(): Observable<IPage[]> {
    return this.http.get<IPage[]>('http://localhost:4202/pages/front-page');
  }

  public getNewestPosts(): Observable<IPage[]> {
    return this.http.get<IPage[]>('http://localhost:4202/pages/newest');
  }

  public createPost(pageData) {
    return this.http.post('http://localhost:4202/pages', pageData);
  }

  public updatePost(updatedData,id) {
    return this.http.put(`http://localhost:4202/pages/${id}`, updatedData);
  }

  public uploadImage(image) {
    return this.http.post('http://localhost:4202/pages/image', image);
  }

  public uploadGalleryImages(images) {
    return this.http.post('http://localhost:4202/pages/images', images);
  }

  public delete(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`http://localhost:4202/pages/${id}`);
  }
}
