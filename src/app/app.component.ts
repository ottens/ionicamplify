import { Component, OnInit } from '@angular/core';
import { Auth, Storage } from 'aws-amplify';

import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Capacitor, Plugins, FilesystemDirectory, FilesystemEncoding, CameraResultType } from '@capacitor/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Hub } from 'aws-amplify';
// import * as Observable from 'zen-observable';

import { Todo } from "../models";
import awsConfig from '../aws-exports.js'
const { Filesystem } = Plugins;

// import { APIService } from './API.service';

// type Todo @model { id: ID! name: String! description: String } enum PostStatus { ACTIVE INACTIVE } type Post @model { id: ID! title: String! rating: Int! status: PostStatus! }
@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  subscription;
  todos: Array<Todo>;
  newTodo = '';
  syncingPhotos: Boolean;
  isUploading: Boolean;
  isFetching: Boolean;
  hasPhoto: Boolean;

  constructor(
    // private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    // private apiService: APIService,
  ) {
    this.syncingPhotos = false;
    this.isUploading = false;
    this.isFetching = false;
    this.initializeApp();
  }
  
  async uploadPhoto(todo) {
    console.log("uploadPhoto ~ todo", todo)
    const fileName = `${todo.id}.jpg`
    const photo = await Filesystem.readFile({
      directory: FilesystemDirectory.Data,
      path: fileName
    });
    if (photo && !this.isUploading) {
      console.log("attempting uploadPhoto ~ photo")
      try {
        this.isUploading = true;
        const result: any = await Storage.put(fileName, photo.data, {
          level: 'public',
          contentType: 'image/jpeg'
        });
        // const signedURL = await Storage.get(result.key);
        // console.log("🚀 ~ file: app.component.ts ~ line 54 ~ AppComponent ~ uploadPhoto ~ signedURL", signedURL)
        const finalFileName = `https://${awsConfig.aws_user_files_s3_bucket}.s3.amazonaws.com/${result.key}`;
        await this.updateTodo(Todo.copyOf(todo, updated => { updated.fileName = result.key; }));
        this.isUploading = false;
      } catch (e) {
        this.isUploading = false;
        console.log('xxx - upload failed');
      }
    }
  }
  async downloadPhoto(todo: Todo) {
    console.log("downloadPhoto ~ todo", todo)
    function downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'download';
      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(url);
          a.removeEventListener('click', clickHandler);
        }, 150);
      };
      a.addEventListener('click', clickHandler, false);
      a.click();
      return a;
    }

    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
      
    });

    const convertBlobToBase642 = (blob) => {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log(base64data);
        return base64data;
      }
    }
// const base64String = await convertBlobToBase64(blob);
// usage
// Storage.get(fileKey, { download: true })
//         .then(res => downloadBlob(res.Body, downloadFileName)) // derive downloadFileName from fileKey if you wish
    const fileName = `${todo.id}.jpg`
    let hasPhoto = false;
    try {
      const photo = await Filesystem.readFile({
            directory: FilesystemDirectory.Data,
            path: fileName
      });
      hasPhoto = true;
      console.log('xxx hasPhoto!', photo)
    } catch (e) {
      console.log('xxx !hasPhoto', e)
    }
    
    if (!hasPhoto) {
      hasPhoto = true;
      try {
        const file: any = await Storage.get(todo.fileName, { download: true });
        console.log('xxx - got file')
        const base64String: any = await convertBlobToBase64(file.Body);
         console.log('xxx - base64 file', base64String)
       await Filesystem.writeFile({
          data: base64String,
          path: fileName,
          directory: FilesystemDirectory.Data
       });

      } catch (e) {
        console.log('xxx - failed writing or getting file', e)
      }
    }
    
    // if (photo) {
    //   try {
    //     const result = await Storage.put(fileName, photo.data, {
    //       level: 'public',
    //       contentType: 'image/jpeg'
    //     });
    //     this.updateTodo({ ...todo, fileName: result.key })
    //   } catch (e) {
    //     console.log('xxx - upload failed');
    //   }
    // }
  }
  async syncPhotos(todoList: Array<Todo>) {
      console.log('xxx - attempting pre photo sync', this.syncingPhotos);
    if (!this.syncingPhotos) {
      console.log('xxx - attempting photo sync');
      this.syncingPhotos = true;
      await todoList.map(async todo => {
        console.log('xxx todo');
        if (todo.hasPhoto && !todo.fileName) {
          try {
            await this.uploadPhoto(todo)
          } catch (e) {
            console.log('xxx - upload failed')
            this.syncingPhotos = false;
          }
        } else if (todo.hasPhoto && todo.fileName) {
          try { 
            await this.downloadPhoto(todo)
          } catch (e) {
            console.log('xxx - download failed')
    this.syncingPhotos = false;
          }
        }
      });
      this.syncingPhotos = false;
    }
  }
  loadMessages(where) {
    // console.log('xxx - vv ' + where);
    DataStore.query<Todo>(Todo, Predicates.ALL, {
      sort: s => s.createdAt("ASCENDING")
    })
      .then(messages => {
        // try {
        //   this.syncPhotos(messages)
        // } catch (e) {}
      this.todos = [...messages];
    })
  }
  ngOnInit() {
    this.loadMessages('ngOnInit');
  }
  initializeApp() {
    this.subscription = DataStore.observe(Todo).subscribe(msg => {
      // console.log(msg.model, msg.opType, msg.element);
      this.loadMessages('subscription');

  });

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
  async signOutOfAll() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('xxx - error signing out: ', error);
    }
  }
  async createTodo() {
    await DataStore.save<Todo>(new Todo({
      name: this.newTodo,
      description: 'testing',
      // createdAt: Date.now()
    }));
    this.newTodo = '';
    // this.loadMessages('createTodo');
  }
  async updateTodo(item) {
    // console.log('xxx - --+', item);
    const itemLocal = { ...item, status: !item.status };
    // console.log('xxx - --+', itemLocal);
    await DataStore.save<Todo>(Todo.copyOf(item, updated => {
    updated.status = !item.status;
  }));
    // this.loadMessages('updateTodo');
  }
  async deleteTodo(id) {
    const toDelete = await DataStore.query(Todo, id);
    DataStore.delete(toDelete);
    // this.loadMessages('deleteTodo');
  }
  async reloadTodos() {
    await DataStore.start();
    this.loadMessages('reloadTodos');
  }
}
