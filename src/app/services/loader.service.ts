import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// https://medium.com/@sehban.alam/how-to-implement-a-global-loader-screen-in-angular-using-angular-material-and-http-interceptor-0707e0847201
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  private isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}