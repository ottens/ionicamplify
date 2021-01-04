import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

// type Todo @model { id: ID! name: String! description: String } enum PostStatus { ACTIVE INACTIVE } type Post @model { id: ID! title: String! rating: Int! status: PostStatus! }
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['app.component.scss']
})
export class MainComponent implements OnInit {
  

  isLoggedIn: Boolean;
  constructor(
  ) {
    
  }
  async ionViewCanEnter(){
    return await Auth.currentAuthenticatedUser()
      .then(() => { this.isLoggedIn = true; })
      .catch(() => { this.isLoggedIn = false; });
  }
  ngOnInit() {
    this.isLoggedIn = false;
  }
}
