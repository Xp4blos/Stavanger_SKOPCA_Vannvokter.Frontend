import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
isNavVisable !: boolean


changeMenuState(isOpen:boolean){
  console.log('menu status ',isOpen? ' -- opened --' : ' -- closed -- ');
  this.isNavVisable = isOpen
}

}
