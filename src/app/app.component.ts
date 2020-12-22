import { Component, OnInit } from '@angular/core';

import { DataStore, Predicates } from '@aws-amplify/datastore';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Hub } from 'aws-amplify';
// import * as Observable from 'zen-observable';
import { Todo } from '../models';

// import { APIService } from './API.service';

// type Todo @model { id: ID! name: String! description: String } enum PostStatus { ACTIVE INACTIVE } type Post @model { id: ID! title: String! rating: Int! status: PostStatus! }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Array<Todo>;
  newTodo: '';
  subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private apiService: APIService,
  ) {
    // this.initializeApp();
  }

  loadMessages() {
    console.log('vv')
    DataStore.query<Todo>(Todo, Predicates.ALL)
    .then(messages => {
      // this.loading = false;
      console.log(messages);
      this.todos = [...messages];
    })
  }
  ngOnInit() {
    this.loadMessages();
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // await DataStore.save<Todo>(new Todo({
      // name: 'dd',
      // description: 'testing'
      // }));
      // this.loadMessages();
//       this.subscription = DataStore.observe<Todo>(Todo).subscribe((msg) => {
//         console.log(msg.model, msg.opType, msg.element);
//       });
//       try {
//       this.todos = await DataStore.query<Todo>(Todo, Predicates.ALL);
//   console.log("Posts retrieved successfully!", JSON.stringify(this.todos, null, 2));
// } catch (error) {
//   console.log("Error retrieving posts", error);
// }
      // this.apiService.ListTodos().then((evt) => {
      //   this.todos = evt.items;
      // });
      // this.apiService.OnCreateTodoListener.subscribe((evt) => {
      //   const data = (evt as any).value.data.onCreateTodo;
      //   this.todos = [...this.todos, data];
      // });
    });
  }
  async createTodo() {
    console.log('---', this.newTodo);
    // this.apiService.CreateTodo({
    //     name: this.newTodo,
    //     description: 'testing'
    // });
    await DataStore.save<Todo>(new Todo({
      name: this.newTodo,
      description: 'testing'
    }));
    this.loadMessages();
  }
  deleteTodo(id) {
    this.apiService.DeleteTodo({ id });
  }
}
