import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "src/app/app.properties";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  public getTotal(cartItems: Array<CartItem>): number {
    return this.cartService.getTotal(cartItems);
  }

  public onClearCart(): void {
    this.cartService.clearCart();
  }

  public onRemoveFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }

  public onAddQuantity(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }

  public onRemoveQuantity(cartItem: CartItem): void {
    this.cartService.removeQuantity(cartItem);
  }

  public onCheckout(): void {
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
