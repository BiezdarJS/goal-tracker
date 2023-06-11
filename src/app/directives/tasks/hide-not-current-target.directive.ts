import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hideNotCurrentTarget]'
})
export class HideNotCurrentTargetDirective {

  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('click')
  hideNotCurrentTarget() {
    // remove active class from each button and each panel
    let acc = document.querySelectorAll(".accordion-item-trigger");
    const nodeList = Array.from(acc);
    nodeList.forEach((item:any) => {
      let panel:any = item.nextElementSibling;
      if (item !== this) {
        item.parentNode.classList.remove('active');
        if (panel.style.maxHeight) {
          item.parentNode.classList.remove('active');
          panel.style.maxHeight = null;
        }
      }
    });
  }

}
