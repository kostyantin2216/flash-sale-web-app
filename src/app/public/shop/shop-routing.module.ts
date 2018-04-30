import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';

const shopRoutes: Routes = [
    {
        path: 'shop',
        component: ShopComponent,
        children: [
            {
                path: '',
                component: ProductListComponent
            },
            {
                path: ':category/:productName',
                component: ProductDetailsComponent
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
