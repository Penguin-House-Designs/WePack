import { Component, HostListener, ElementRef  } from '@angular/core';
import {style, animate, state, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('show', style({
        opacity: 0
      })),
      state('hide',   style({
        opacity: 1
      })),
      transition('show => hide', [ style({opacity: 0}) , animate('800ms ease-in-out')]),
      transition('hide => show',[ style({opacity: 1}), animate('800ms ease-in-out')] ) 
    ]),
    trigger('loaderAnimate', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate('1s 7s ease-in-out', style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ]),
    trigger('loaderAnimate2', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({height:0}),
        animate('0.2s 7s ease-in-out') 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({display:'content'})) 
      ])
    ]),
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateY(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateY(-100%)"
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class AppComponent {

  state = 'hide'

  title = 'wepack'

  menu_show = false
  menu_hide = false

  constructor(public el: ElementRef) {

   }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const scrollPosition = window.pageYOffset

      if (scrollPosition >= 20) {
        this.state = 'show'
      } else {
        this.state = 'hide'
      }

    }

    closeMenu(){
      this.menu_hide = true
      setTimeout(()=>{
        this.menu_show = false
        this.menu_hide = false
      },900)
    }
    

}
