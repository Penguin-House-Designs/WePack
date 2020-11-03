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
    number: '',
    email: '',
    message: ''
  }

  quote = {
    type: '',
    zip: '',
    size: '',
    when: '2020-12',
    name: '',
    number: '',
    email: ''
  }

  servicesOBJ = [
    {
      url: '../assets/img/back-img/Apacking.jpg',
      show: false,
      title: 'Packing & Unpacking',
      des: `Why trust two guys from the phonebook when you can trust us and our highly trained, fast-pace team to do
      it for you.`
    },
    {
      url: '../assets/img/back-img/Blifing-couch.jpg',
      show: false,
      title: 'Moving',
      des: `Managing thousands of projects nationally and internationally a year, WePack is committed to seamless
      logistics when it comes to relocating. This is allows clients a stress-free experience.`
    },
    {
      url: '../assets/img/back-img/Cerda-estremera-581452-unsplash.jpg',
      show: false,
      title: 'Supplies',
      des: `WePack prides itself on being a green business. We will provide our clients with recycled supplies or new
      supplies
      depending on their preference.`
    },
    {
      url: '../assets/img/back-img/Dstorage.jpg',
      show: false,
      title: 'Storage (short-term & long-term)',
      des: `We understand storage may be needed when it comes to relocating.
      Storage arrangements can be easily met along with the necessary security levels.
      WePack has partnered with high standard storage facilities that can also cater to cars or other large
      vehicles
      as well.`
    },
    {
      url: '../assets/img/back-img/Estephane-yaich-644691-unsplash.jpg',
      show: false,
      title: 'Crating & Uncrating',
      des: `If cardboard boxes don't cut it for some of your home's treasures, then crating and uncrating services
      can be provided onsite and off.`
    },
    {
      url: '../assets/img/back-img/Fjosh-rinard-71760-unsplash.jpg',
      show: false,
      title: 'Vehicle Transportation',
      des: `Arranged transport of cars, SUVs, and other vehicles can be done in a timely manner. Transportation can
      be included in custom programs.`
    },
    {
      url: '../assets/img/back-img/Gwhite-glove-services-1.jpg',
      show: false,
      title: 'Fine Art Removal & Installation',
      des: `Specialized artwork removal, transportation/protection and reinstallation can be included.`
    },
    {
      url: '../assets/img/back-img/Hstaging.jpg',
      show: false,
      title: 'Home Staging',
      des: `The job doesn't end when your belongings are delivered. At your request, our team can assemble your
      furniture and move them to your desired locations. Our staging services provide a seemless and stress-free
      transition
      into your new home.`
    },
    {
      url: '../assets/img/back-img/Ipiano.jpg',
      show: false,
      title: 'Piano Moving',
      des: `Pianos are expensive pieces of equipment that require the utmost care when it comes
      to moving. WePack is partnered with the best piano movers in the industry and also offers 
      storage for these instruments in secure, climate-controlled facilities.`
    }
  ]

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
    return this.http.get(`<google sheet id here>Name=${this.quote.name}&Number=${this.quote.number}&Email_Address=${this.quote.email}&When=${this.quote.when}&Move_Size=${this.quote.size}&Move_Type=${this.quote.type}&Zipcode=${this.quote.zip}`).subscribe();
  }

  sendEmail() {
    console.log('inside email fun');
    // this.postDataToSheet()
    // this.compileEmail(this.client)
    
  }

  sendQuote() {
    console.log('inside quote fun');
    console.log('quote', this.quote);

    // this.postDataToSheet()
    // this.compileEmail(this.quote)
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
      // 'event_callback': callback
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
      // 'event_callback': callback
    });
    return false;
  }

  compileEmail(newClient) {
    console.log('inside compileemail')
    let headers = new Headers();
    let eObject = {
      name: newClient.name,
      number: newClient.number,
      email: newClient.email,
      type: newClient.type,
      size: newClient.size,
      zip: newClient.zip,
      when: newClient.when,
      headers: headers
    };
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    console.log('before sendmail')
    return this.http.post('/sendmail', eObject).subscribe((data) => {
      if (data.json().success) {
        console.log('Sent successfully');
        this.quote = {
          type: '',
          zip: '',
          size: '',
          when: '2020-12',
          name: '',
          number: '',
          email: ''
        }
        this.gtag_report_conversion_email(this.url)
      }
    })
  }


}
