import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationService} from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  private pageRequest: PageRequest = {page: 0, size: 3, sortBy: '', sortStrategy: ''};
  @Input() page: Page<any>;
  @Input() api: string;
  @Output() updatePage: EventEmitter<Page<any>> = new EventEmitter<Page<any>>();


  constructor(private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.fetch();
  }

  nextPage() {
    this.pageRequest.page++;
    this.fetch();
    console.log(this.page.content);
  }

  previousPage() {
    this.pageRequest.page--;
    this.fetch();
    console.log(this.page.content);
  }

  fetch(): void {
    this.paginationService.getPage(this.api, this.pageRequest)
      .subscribe((page: Page<any>) => {
        this.page = page;
        this.updatePage.emit(this.page);
      });
  }

}
