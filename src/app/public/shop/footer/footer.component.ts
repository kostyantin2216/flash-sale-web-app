import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCollections } from '../../../service/product/product-collections.model';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  sections: {name: string, title: string}[] = [];

  constructor(
  ) {
    const collections = new ProductCollections();
    const sectionKeys = Object.keys(collections);
    sectionKeys.forEach(section => {
      this.sections.push({
        name: section,
        title: collections[section].title
      });
    });
  }

}
