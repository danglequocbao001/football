import { NgPLanguageService } from "./ng-p-language.service";

export class LanguageConstants {
    public static dataLanguage: any = {};
    public static arrLanguage: any = [];
    constructor(
        private langueService: NgPLanguageService
    ) {
        this.langueService.getLanguage.subscribe((data: any) => {
            LanguageConstants.dataLanguage = data;
        },
        (error)=>{
            throw error
        })
    }
}