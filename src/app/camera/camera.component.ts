import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Capacitor, Plugins, FilesystemDirectory, FilesystemEncoding, CameraResultType } from '@capacitor/core';
import { Storage } from 'aws-amplify';
import { DomSanitizer } from '@angular/platform-browser';
import { Todo } from 'src/models';

const { Filesystem, Camera } = Plugins;


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  constructor(
    // private camera: Camera
    private sanitizer: DomSanitizer,
  ) { }

  // @Input() hasPhoto: Boolean;
  // @Output() updatingTodo = new EventEmitter<Todo>();
  ngOnInit() {
    this.loadPhoto()
  }
  fileName = `temp.jpg`

  async setImage() {
    const finalPhotoUri = await Filesystem.getUri({
            directory: FilesystemDirectory.Data,
            path: this.fileName
          });
          let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
          this.image = this.sanitizer.bypassSecurityTrustUrl(`${photoPath}`);
          console.log("xxx ~ loadPhoto ~ this.image", this.image)
  }
  async loadPhoto() {
      try {
        const photo = await Filesystem.readFile({
          directory: FilesystemDirectory.Data,
          path: this.fileName
        });
      
        // console.log("xxx ~ file: camera.component.ts ~ line 37 ~ CameraComponent ~ loadPhoto ~ finalPhotoUri", finalPhotoUri)
        if (photo) {
                  console.log("xxx ~ photo for display", this.fileName, photo)

          
          
        }
      } catch (e) {
        console.log('failed loading photo', this.fileName)
      }
    
  }
  // options: CameraOptions = {
  // quality: 100,
  // destinationType: this.camera.DestinationType.FILE_URI,
  // encodingType: this.camera.EncodingType.JPEG,
  // mediaType: this.camera.MediaType.PICTURE
  // }
  options = {
      resultType: CameraResultType.Uri
    };
  image;
  // async copy(fileURI: string, doto: Todo) {
  //   try {
  //     // This example copies a file within the documents directory
  //     let ret = await Filesystem.copy({
  //       from: fileURI,
  //       to: `${FilesystemDirectory.Documents}${doto.id}.jpg`,
  //       // directory: FilesystemDirectory.Documents
  //     });
  //     console.log("🚀 ~ file: camera.component.ts ~ line 39 ~ CameraComponent ~ copy ~ ret", ret)
  //   } catch(e) {
  //     console.error('Unable to copy file', e);
  //   }
  // }
  // async fileWrite(filePath) {
  //   try {
  //     const result = await Filesystem.writeFile({
  //       path: 'secrets/text.txt',
  //       data: "This is a test",
  //       directory: FilesystemDirectory.Documents,
  //       encoding: FilesystemEncoding.UTF8
  //     })
  //     console.log('Wrote file', result);
  //   } catch(e) {
  //     console.error('Unable to write file', e);
  //   }
  // }
  getImgContent(url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
  async takePicture() {
    const fileName = `temp.jpg`
    const originalPhoto = await Camera.getPhoto(this.options);
    const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });
    console.log("🚀 ~ file: camera.component.ts ~ line 87 ~ CameraComponent ~ takePicture ~ photoInTempStorage", photoInTempStorage)
    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: FilesystemDirectory.Data
    });
    await this.setImage();
  }
}




