import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastInfo } from './model/toast-info.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  show(toast: ToastInfo) {
    let className;
    if (toast.type === "DANGER") {
      className = 'danger-toast';
    } else {
      className = 'success-toast';
    }
    this._snackBar.open(toast.body, 'Close', {
      duration: 2000,
      panelClass: [className]
    });
    this.toasts.push({...toast, className});
  }
}