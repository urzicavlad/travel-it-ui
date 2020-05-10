import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  private BOOKS_API = 'http://localhost:8080/api/books/';

  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Array<Book>>(this.BOOKS_API);
  }

  getPage(pageRequest: PageRequest): Observable<Page<Book>> {
    const url = this.BOOKS_API.concat(
      `?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest.sortBy},${pageRequest.sortStrategy}`);
    return this.http.get<Page<Book>>(url);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(this.BOOKS_API.concat(id));
  }

  saveBook(book: Book) {
    return this.http.post<Book>(this.BOOKS_API, book);
  }

  updateBook(book: Book) {
    return this.http.put<Book>(this.BOOKS_API, book);
  }

  deleteBook(book: Book) {
    return this.http.delete<Book>(this.BOOKS_API.concat(book.id.valueOf()));
  }
}
