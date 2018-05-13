import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from "@angular/core";
import * as S3 from 'aws-sdk/clients/s3';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class S3Service {

    private s3: S3;

    constructor() {
        this.s3 = new S3({
            region: environment.region,
            credentials: {
                accessKeyId: environment.awsaid,
                secretAccessKey: environment.awssk
            }
        });
    }

    fetchProductDescription(uri): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.s3.getObject({Bucket: 'product-descriptions', Key: uri}, (err, data) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(data.Body.toString());
                }
                observer.complete();
            });
        });
    }

}
