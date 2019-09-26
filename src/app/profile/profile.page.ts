import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from './profile.service';
import { UserDetails } from './profile.model';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Capacitor, Plugins, CameraSource, CameraResultType } from '@capacitor/core';


function base64toBlob(base64Data, contentType) {   // Using this utility function, can convert string into file
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }     byteArrays[sliceIndex] = new Uint8Array(bytes);
 }
  return new Blob(byteArrays, { type: contentType });
}  // End of the base64toBlob function

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>; // corection to the erro add {static: false}
 // @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string | File;
  usePicker = false; // new property

  @Output() image = new EventEmitter<string >();
  
  imageSub: Subscription;
  userDetails: UserDetails[];
  userSub: Subscription;
  constructor(private profileService: ProfileService, private platform: Platform) { }

  ngOnInit() {

    //this.profileService.getimage().subscribe(data => this.selectedImage = data);
   this.userSub = this.profileService.UserDetails.subscribe(user => {
     this.userDetails = user;
   });

   console.log("this.profileService.images"); 
   console.log('Mobile:', this.platform.is('mobile'));  // show what are the working divise
   console.log('Hybrid:', this.platform.is('hybrid'));
   console.log('IOS:', this.platform.is('ios'));
   console.log('Android:', this.platform.is('android'));
   console.log('Desktop:', this.platform.is('desktop')); // show what are the working divise

   if (this.platform.is('mobile') && !this.platform.is('hybrid') || this.platform.is('desktop') ) {
     this.usePicker = true;
    }

  }


  ionViewWillEnter() {
    this.profileService.getimage().subscribe(data => this.selectedImage = data);
    this.profileService.fatch().subscribe();
  }

//  onImagePicked(imageData: string ) {
   // let imageFile; // this is a variable
   // if (typeof imageData === 'string') { // check typeof image data
      // tslint:disable-next-line: max-line-length
    //  try {
      //  console.log(imageData);
      //  this.profileService.imageUplode(imageData);
        // tslint:disable-next-line: max-line-length
         // imageFile =   base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg'); // pass the image data string to the function and after converting ,it is stored imageFile property
         // console.log(imageFile );
   // } catch (error) {
   //     console.log(error);
   //     return;
   //   }
  //   } else {                   // if imageData is a file, not need to converet into the file
   //  imageFile = imageData;
    
 //   }
  
  // this.profileService.imageUplode(imageFile);
 // }  // End of the OnImagePicked function

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')  ) {    // check whether camera available and usePiker is true
      this.filePickerRef.nativeElement.click();                       // open the fille picker
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        //this.selectedImage = image.dataUrl;
        // this.selectedImage  = 'data:image/jpeg;base64,' + image;
         //this.selectedImage = image.base64String;
         this.selectedImage = 'data:image/jpeg;base64,' + image.base64String;  // Base64 string
         console.log(this.selectedImage);
         this.profileService.imageUplode(this.selectedImage);
        // this.imagePick.emit('data:image/jpeg;base64,' + image.base64String);
        // this.imagePick.emit(image.base64String);
        // console.log(this.selectedImage);
      })
      .catch(error => {
       // console.log(error);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }

  onFileChosen(event: Event){
    //console.log(event);
    const pickedFile = (event.target as HTMLInputElement).files[0];
    //console.log("imahe: " + pickedFile);
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      //console.log("datau: "+ dataUrl);
      this.selectedImage = dataUrl;
      this.profileService.imageUplode(this.selectedImage);
     // this.imagePick.emit(this.selectedImage);
      //console.log(pickedFile);
    }
    fr.readAsDataURL(pickedFile);
      }

}
