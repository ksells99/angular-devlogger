import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
// import log service
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  // Use Log interface
  logs: Log[];
  selectedLog: Log;

  //Loading=false by default
  loaded: boolean = false;

  // Inject service as dependency
  constructor(private logService: LogService) {}

  // Runs when component initialised
  ngOnInit() {
    // Subscribe to stateClear observable within log service injected above
    this.logService.stateClear.subscribe((clear) => {
      if (clear) {
        this.selectedLog = { id: '', text: '', date: '' };
      }
    });

    // Subscribe to getLogs observable within log service injected above
    // Returns logs array
    this.logService.getLogs().subscribe((logs) => {
      // Set logs to returned array
      this.logs = logs;

      //Set loaded to true
      this.loaded = true;
    });
  }

  onSelect(log: Log) {
    // Pass selected log to logService - call setFormLog within it
    this.logService.setFormLog(log);

    // Set selected log to this log.
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    // Pass log into logService to delete
    if (confirm('Are you sure?')) {
      this.logService.deleteLog(log);
    }
  }
}
