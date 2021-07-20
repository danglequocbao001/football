import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountService } from './http';
@Injectable()
export class StorageService {
    private userSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private accountService: AccountService,
    ) { }
    public clear() {
        this.userSub.next(null);
    }
    public get infoAccount(): Observable<any> {
        return this.userSub.asObservable();
    }
    public setInfoAccount() {
        if (localStorage.getItem('Authorization') !== null) {
            return this.accountService.getAccounts().subscribe((data: any) => {
                this.userSub.next(data.user);
            })
        }
      

    }
}
