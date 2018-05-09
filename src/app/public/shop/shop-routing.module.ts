import { ProductDetailsGuard } from './product-details/product-details.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { ProductListGuard } from './product-list/product-list.guard';

const shopRoutes: Routes = [
    {
        path: 'shop',
        component: ShopComponent,
        children: [
            {
                path: '',
                component: ProductListComponent,
                canActivate: [ ProductListGuard ]
            },
            {
                path: ':category/:productName',
                component: ProductDetailsComponent,
                canActivate: [ ProductDetailsGuard ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(shopRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopRoutingModule { }
