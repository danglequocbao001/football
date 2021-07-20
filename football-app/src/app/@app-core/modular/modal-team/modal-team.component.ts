import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CompetitionService } from '../../http';
import { LanguageConstants } from '../ng-p-language/common.language';

@Component({
  selector: 'app-modal-team',
  templateUrl: './modal-team.component.html',
  styleUrls: ['./modal-team.component.scss'],
})
export class ModalTeamComponent implements OnInit, OnChanges {
  @Input() data_team;
  @Input() title_team;
  dataLanguage = LanguageConstants.dataLanguage;

  search = ''
  constructor(
    private competitonService:CompetitionService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
  }
  change(event) {
    this.search = event.detail.value
  }
  clickSub(item) {
    const res = {
      subscribe_source: {
        sourceable_id: item.league_id,
        sourceable_type: "Competition",
        device_key: localStorage.getItem('device-key')
      }
    }

    if (item.subscribe) {
      this.competitonService.unsubscribe(res['subscribe_source']).subscribe((data) => {
        item.subscribe = !item.subscribe;
      },
      (error)=>{
        throw error
      })
    }
    else {
      this.competitonService.subscribe(res).subscribe((data) => {
        item.subscribe = !item.subscribe;
      },
      (error)=>{
        throw error
      })
    }


  }
}
