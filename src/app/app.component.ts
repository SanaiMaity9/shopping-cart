import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping';
  constructor(private router: Router){}

  getUrl(): boolean{
    if(this.router.url === '/cart'){
      return false;
    }else{
      return true;
    }
  }
}
