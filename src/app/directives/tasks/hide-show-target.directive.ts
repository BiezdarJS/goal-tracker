import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hideShowTarget]'
})
export class HideShowTargetDirective {

  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('click', ['$event'])
  hideShowTarget(event:any) {
    const target = this.elRef.nativeElement;
    let targetPanel = target.nextElementSibling;
    // targetPanel.scrollHeight + "px";
    console.log(target.parentNode);
    target.parentNode.classList.toggle('active');
    if (targetPanel.style.maxHeight) {
      targetPanel.style.maxHeight = null;
    } else {
      targetPanel.style.maxHeight = targetPanel.scrollHeight + "px";
    }
  }

}
