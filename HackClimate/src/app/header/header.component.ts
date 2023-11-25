import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() isMenuOpen = new EventEmitter<boolean>()


  isOpen : boolean = false



  onMenuClicked(){
    this.isOpen = !this.isOpen
    this.isMenuOpen.emit(this.isOpen)
  }
}
