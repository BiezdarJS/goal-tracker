import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[openMobileMenu]'
})
export class OpenMobileMenuDirective {


  mobileMenuCloseBtn = this.elRef.nativeElement;
  mobileMenu = this.mobileMenuCloseBtn.parentNode.parentNode;
  mobileMenuOpenBtn:any;



  constructor(
    private elRef: ElementRef
  ) {  }




  @HostListener('click')
  async closeMobileMenu() {
    await this.handleMobileMenuSidenav();
    await this.handleMobileMenuOpenBtn();
  }

  handleMobileMenuSidenav = () => {
    if (this.mobileMenu.classList.contains('hidden')) {
      setTimeout(() => {
        this.mobileMenu.classList.toggle('hidden');
      },350);
    } else {
      this.mobileMenu.classList.toggle('hidden');
    }
  }

  handleMobileMenuOpenBtn = () => {
    this.mobileMenuOpenBtn = this.mobileMenuCloseBtn.parentNode.parentNode.parentNode.querySelector('.sidenav-mobile-open');
    if (this.mobileMenuOpenBtn.classList.contains('active')) {
      this.mobileMenuOpenBtn.classList.toggle('active');
    } else {
      setTimeout(() => {
        this.mobileMenuOpenBtn.classList.toggle('active');
      },350);
    }
  }





}
