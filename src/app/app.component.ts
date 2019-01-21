import { Component, HostListener, ElementRef } from '@angular/core';
import { style, animate, state, transition, trigger } from '@angular/animations';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('show', style({
        opacity: 0
      })),
      state('hide', style({
        opacity: 1
      })),
      transition('show => hide', [animate('800ms ease-out')]),
      transition('hide => show', [animate('800ms ease-in')])
    ]),
    trigger('loaderAnimate', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate('1s 7s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('loaderAnimate2', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ height: 0 }),
        animate('0.2s 7s ease-in-out')
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ display: 'content' }))
      ])
    ]),
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateY(0)"
      })),
      state('hide', style({
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

  url = 'https://wpmoving.com/'

  client = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }

  constructor(public el: ElementRef,
    private http: Http) {

  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= 20) {
      this.state = 'show'
    } else if (scrollPosition < 20) {
      this.state = 'hide'
    }

  }

  closeMenu() {
    this.menu_hide = true
    setTimeout(() => {
      this.menu_show = false
      this.menu_hide = false
    }, 900)
  }

  closeMenuCall() {
    this.gtag_report_conversion_mobile(this.url);
    this.menu_hide = true
    setTimeout(() => {
      this.menu_show = false
      this.menu_hide = false
    }, 900)

    
  }
  

  postDataToSheet() {
    return this.http.get(`<google sheet id here>First_Name=${this.client.firstName}&Last_Name=${this.client.lastName}&Email_Address=${this.client.email}&Message=${this.client.message}`).subscribe();
  }

  sendEmail() {
    this.postDataToSheet()
    this.compileEmail(this.client)
  }

  gtag_report_conversion_email(url) {
    const gtag = window['gtag'];
    let callback = () => {
      if (typeof (url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
      'send_to': '',
      'event_callback': callback
    });
    return false;
  }

  gtag_report_conversion_mobile(url) {
    const gtag = window['gtag'];
    let callback = () => {
      if (typeof (url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
      'send_to': '',
      'event_callback': callback
    });
    return false;
  }

  compileEmail(newClient) {
    console.log('inside compileemail')
    let headers = new Headers();
    let eObject = {
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      email: newClient.email,
      message: newClient.message,
      headers: headers
    };
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    console.log('before sendmail')
    return this.http.post('/sendmail', eObject).subscribe((data) => {
      if (data.json().success) {
        console.log('Sent successfully');
        this.client = {
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        }
        this.gtag_report_conversion_email(this.url)
      }
    })
  }


}
