import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  public addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this.snackBarMessage("1 item added to cart");
  }

  public clearCart(): void {
    this.cart.next({ items: [] });
    this.snackBarMessage("Cart is cleared");
  }

  public getTotal(cartItems: Array<CartItem>): number {
    return cartItems
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  public removeFromCart(cartItem: CartItem): void {
    const items = this.cart.value.items.filter(
      (_item) => _item.id !== cartItem.id
    );
    this.cart.next({ items });
    this.snackBarMessage("1 item removed from cart");
  }

  public removeQuantity(cartItem: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let items = this.cart.value.items.map((_item) => {
      if (_item.id === cartItem.id) {
        _item.quantity--;
        if (_item.quantity == 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      this.removeFromCart(itemForRemoval);
    } else {
      this.cart.next({ items });
      this.snackBarMessage("1 item removed from cart");
    }
  }

  private snackBarMessage(msg: string): void {
    this._snackBar.open(msg, "OK", { duration: 3000 });
  }
}
