import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { SummarizedProduct, ProductCollections } from './../../../service/product.service';
import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  sections: string[];
  currentSectionTitle: string = null;
  currentSectionName: string = null;

  private sectionsIndex: any = [];
  private collectionsSkeleton = new ProductCollections();
  private fragmentSub: Subscription;

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private scrollToService: ScrollToService
  ) {
    this.sections = Object.keys(this.collectionsSkeleton);
  }

  ngOnInit() {
    this.fragmentSub = this.route.fragment.subscribe(fragment => {
      console.log(fragment);
      setTimeout(() => {
        this.scrollToService.scrollTo({
          target: fragment
        });
      }, 100);
    });
  }

  ngOnDestroy() {
    this.fragmentSub.unsubscribe();
  }

  productSelected(product: SummarizedProduct) {
    this.router.navigate(['/shop', product.brand, product.name]);
  }

  sectionPosition($event) {
    this.sectionsIndex = this.sectionsIndex.filter(item => item.name !== $event.name);
    this.sectionsIndex.push($event);
    this.sectionsIndex.sort((a: any, b: any) => {
      return b.position - a.position;
    });
    if (document.body.scrollTop > 0) {
      this.updateCurrentSectionTitle();
    }
  }

  @HostListener("window:scroll", [])
  updateCurrentSectionTitle() {
    if (this.el.nativeElement.parentElement) {
      let offset: number = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
      for (let section of this.sectionsIndex) {
        if ((section.position + offset - window.scrollY - 25) < 0) {
          this.currentSectionName = section.name;
          this.currentSectionTitle = this.collectionsSkeleton[section.name].title;
          return;
        }
      }
    }
    this.currentSectionName = null;
    this.currentSectionTitle = null;
  }

}
