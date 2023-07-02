import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';


@Directive({
    selector: '[passwordToggle]'
})


export class PasswordToggleDirective implements OnInit {


    constructor(
        private el: ElementRef
    ) { }


    @HostListener('click')
    toggleShowHide() {
        let passwordToggle = this.el.nativeElement;
        let passwordInputWrap = passwordToggle.parentNode;
        let passwordInput = passwordToggle.previousElementSibling;

        if (passwordInputWrap.classList.contains('swap-on')) {
            passwordInputWrap.classList.remove('swap-on');
        } else {
            passwordInputWrap.classList.add('swap-on');
        }

        if (passwordInput.getAttribute("type") === "password") {
            passwordInput.setAttribute("type", "text");
        } else {
            passwordInput.setAttribute("type", "password");
        }
    }


    ngOnInit(): void {

    }

}

