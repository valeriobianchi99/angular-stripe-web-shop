import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  sort: string = "desc";
  itemsShowCount: number = 12;

  @Output()
  sortChange = new EventEmitter<string>();

  @Output()
  itemsCountChange = new EventEmitter<number>();

  @Output()
  columnsCountChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  public onItemsUpdated(newItemsShowCount: number): void {
    this.itemsShowCount = newItemsShowCount;
    this.itemsCountChange.emit(newItemsShowCount);
  }

  public onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
