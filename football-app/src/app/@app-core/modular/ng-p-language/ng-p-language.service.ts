import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageConstants } from './common.language';
import { File } from '@ionic-native/file/ngx';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NgPLanguageService {

  private arrLanguage: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private dataLanguage: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(
    private http: HttpClient,
    private file: File,
  ) {
    // LanguageConstants.dataLanguage = this.dataLanguage.asObservable();
  }

  public loadFileLanguage() {

    // return this.http.get<any>(`${APICONFIG.NEWS.GET_ID(id)}`).pipe(
    //   map((result) => {
    //     return result;
    //   }),
    //   catchError((errorRes) => { throw errorRes.error; }));

    return this.http.get('https://res.cloudinary.com/baodang359/raw/upload/v1624950630/language.csv', { responseType: 'text' })
    //  return this.http.get('http://localhost:8100/assets/language.csv', { responseType: 'text' })
      .pipe(
        map((data) => {
          this.readFileCSV(data);
          return data;
        }), catchError((errorRes) => { throw errorRes.error; })
      )

    // this.http.get('https://res.cloudinary.com/baodang359/raw/upload/v1621589124/language_wiwezn.csv', { responseType: 'text' })
    // .subscribe(data => {
    //   this.readFileCSV(data);
    // }, error => {
    // });


    // if (this.file.applicationDirectory === null) {
    //   // this.http.get('http://localhost:8100/assets/language.csv', { responseType: 'text' })
    //   this.http.get('https://res.cloudinary.com/baodang359/raw/upload/v1621589124/language_wiwezn.csv', { responseType: 'text' })
    //     .subscribe(data => {
    //       this.readFileCSV(data);
    //     }, error => {
    //     });
    // } else {
    //   this.file.readAsText(this.file.applicationDirectory, 'www/assets/language.csv').then((data) => {
    //     this.readFileCSV(data);
    //   }).catch((err) => {
    //   })
    // }
  }

  public readFileCSV(data) {
    let csvToRowArray = data.split("\n");
    let tempDataLanguage = {};
    const arrLanguage = csvToRowArray[0].split(",").splice(4);
    for (let i = 0; i < arrLanguage.length; i++) {
      arrLanguage[i] = arrLanguage[i].trim();
    }
    this.arrLanguage.next(arrLanguage);
    LanguageConstants.arrLanguage = arrLanguage;
    let selectedLanguage = this.getSelectedLanguage(arrLanguage[1]);
    const poositionLanguage = arrLanguage.indexOf(selectedLanguage);
    for (let index = 1; index < csvToRowArray.length; index++) {
      let row = csvToRowArray[index].split(",");
      tempDataLanguage[row[3]] = row[poositionLanguage + 4];
    }
    this.dataLanguage.next(tempDataLanguage);
    return LanguageConstants.dataLanguage = tempDataLanguage;
  }

  public get getLanguage(): Observable<any> {
    return this.dataLanguage.asObservable();
  }

  // gia tri valueDefault dung cho app chay khoi tao dau tien, khong duoc su dung
  public getSelectedLanguage(valueDefault?: string) {
    let temp = localStorage.getItem('language');
    if (temp !== undefined && temp !== null) {
      return temp;
    } else {
      localStorage.setItem('language', valueDefault || 'Vietnamese');
      return valueDefault || 'Vietnamese';
    }
  }

  public setSelectedLanguage(value: any) {
    localStorage.setItem('language', value || 'Vietnamese');
    location.reload();
  }

  public get getArrLanguage(): Observable<any> {
    return this.arrLanguage.asObservable();
  }
}
