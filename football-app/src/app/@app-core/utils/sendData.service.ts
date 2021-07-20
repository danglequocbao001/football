import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private data: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get receiveData(): Observable<any> {
    return this.data.asObservable();
  }
  public sendData(value: any) {
    this.data.next(value);
  }
  constructor(
   
  ) { }

 
}
