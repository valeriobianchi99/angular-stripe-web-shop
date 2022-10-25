import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input()
  fullWidthMode: boolean = false;

  @Input()
  product: Product | undefined;

  @Output()
  addToCart = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
