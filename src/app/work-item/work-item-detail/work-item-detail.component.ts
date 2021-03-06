import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Logger } from '../../shared/logger.service';
import { WorkItem } from '../work-item';
import { WorkItemService } from '../work-item.service';

@Component({
  selector: 'work-item-detail',
  templateUrl: '/work-item-detail.component.html',
  styleUrls: ['/work-item-detail.component.css']
})
export class WorkItemDetailComponent implements OnInit {
  @Input() workItem: WorkItem;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private workItemService: WorkItemService,
    private route: ActivatedRoute,
    private logger: Logger) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.logger.log('details view with ID = ' + id);
        this.workItemService.getWorkItem(id)
          .then(workItem => this.workItem = workItem);
      } else {
        this.navigated = false;
        this.workItem = new WorkItem();
        this.logger.log('details view');
        this.workItem.fields = {"system.owner": 'me', "system.state": 'new'};
        this.workItem.type = '1';
      }
    });
  }

  save() {
    this.workItemService
      .save(this.workItem)
      .then(workItem => {
        this.workItem = workItem; // saved workItem, w/ id if new
        this.logger.log(`created and returned this workitem: ${workItem}`);
        this.goBack(workItem);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedWorkItem: WorkItem = null) {
    this.close.emit(savedWorkItem);
    if (this.navigated) { window.history.back(); }
  }
}
