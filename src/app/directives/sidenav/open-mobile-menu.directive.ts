import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[openMobileMenu]'
})
export class OpenMobileMenuDirective {

  mobileMenuOpenBtn = this.elRef.nativeElement;
  mobileMenu = this.mobileMenuOpenBtn.parentNode.parentNode.querySelector('.sidenav');
  // mobileMenuOpenBtn:any;


  constructor(
    private elRef: ElementRef
  ) {  }


  @HostListener('click')
  async openMobileMenu() {
    await this.handleMobileMenuOpenBtn();
    await this.handleMobileMenuSidenav();
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
    if (this.mobileMenuOpenBtn.classList.contains('active')) {
      this.mobileMenuOpenBtn.classList.toggle('active');
    } else {
      setTimeout(() => {
        this.mobileMenuOpenBtn.classList.toggle('active');
      },350);
    }
  }

}
