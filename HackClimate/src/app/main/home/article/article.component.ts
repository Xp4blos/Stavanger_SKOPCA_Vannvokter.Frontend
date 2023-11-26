import { Component, Input } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
@Input() article!: any


}
