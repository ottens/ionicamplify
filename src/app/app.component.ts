import { Component, OnInit } from '@angular/core';
import { Auth, Storage } from 'aws-amplify';

import { DataStore, Predicates } from '@aws-amplify/datastore';

import { Platform } from '@ionic/angular';

import { Todo } from "../models";
import awsConfig from '../aws-exports.js'

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  subscription;
  todos: Array<Todo>;
  newTodo = '';

  constructor() {
  }
  ngOnInit() {
    this.loadMessages();
    this.subscription = DataStore.observe(Todo).subscribe(msg => {
      this.loadMessages();
    });
  }
  loadMessages() {
    DataStore.query<Todo>(Todo, Predicates.ALL, {
      sort: s => s.createdAt("ASCENDING")
    }).then(messages => {
      this.todos = [...messages];
    })
  }
  handleKeyUp(event) {
    if (event.keyCode === 13) { 
      this.createTodo();
    }
  }
  async signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('xxx - error signing out: ', error);
    }
  }
  async createTodo() {
    await DataStore.save<Todo>(new Todo({
      name: this.newTodo,
      description: 'testing',
    }));
    this.newTodo = '';
  }
  async updateTodo(item) {
    const itemLocal = { ...item, status: !item.status };
    await DataStore.save<Todo>(Todo.copyOf(item, updated => {
      updated.status = !item.status;
    }));
  }
  async deleteTodo(id) {
    const toDelete = await DataStore.query(Todo, id);
    DataStore.delete(toDelete);
  }
}
