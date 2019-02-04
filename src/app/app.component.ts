import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBmPE-tsVzb8-z81yxIsaGJGtZnCjLnXtA',
      authDomain: 'ng-recipe-book-d4735.firebaseapp.com'
    });
  }
}
