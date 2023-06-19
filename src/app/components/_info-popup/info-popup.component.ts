import { Component, ElementRef, OnInit } from '@angular/core';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { NameNotificationService } from 'src/app/services/login/name-notification.service';
// Modal
declare function Modal(): void;

@Component({
  selector: 'gt-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {


  imagesURL: string = '';
  // Info Modal
  infoModal!:any;
  // Session Storage
  welcomeName!:any;

  constructor(
    private globalVars: GlobalVariablesService,
    private elRef: ElementRef
  ) {}

  ngOnInit():void {
    // Session Storage
    this.welcomeName = sessionStorage.getItem('welcome-name');
    // Images URL
    this.imagesURL = this.globalVars.imagesURL;
    // modal
    this.infoModal = new (Modal as any)({
      el: this.elRef.nativeElement,
      backdrop: 'static'
    });
    this.infoModal.on('show', function(myModal:any, event:Event) {
      // Do something before we start showing modal.
      // myModal.setAttribute('class', 'test');
      myModal.el.childNodes[0].classList = 'modal new-goal animate__animated animate__bounceIn';
    });
    this.infoModal.show();
  }


  closeModal() {
    this.infoModal.hide();
    sessionStorage.setItem('welcome-message', 'accepted');
  }

}
