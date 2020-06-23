import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
// import log service
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  // Inject service as dependency
  constructor(private logService: LogService) {}

  ngOnInit() {
    // Subscribe to selectedLog observable within log service injected above
    // Returns the log clicked on in the logs component - allows it to be displayed in form component
    this.logService.selectedLog.subscribe((log) => {
      // Only run if ID is not null (i.e. only if a log has been clicked)
      if (log.id !== null) {
        this.isNew = false;
        // Set form fields to the log data passed in

        (this.id = log.id), (this.text = log.text), (this.date = log.date);
      }
    });
  }

  onSubmit() {
    // Check if new log being added
    if (this.isNew) {
      // Create new log
      const newLog = {
        // Generate new ID using below function
        id: this.generateId(),

        text: this.text,
        date: new Date(),
      };

      // Add log - call from logService injected above
      this.logService.addLog(newLog);

      // Else update log
    } else {
      const updLog = {
        // Keep ID the same
        id: this.id,

        // Update text and date
        text: this.text,
        date: new Date(),
      };

      // Update - call from logService injected above
      this.logService.updateLog(updLog);
    }

    // Clear state & form
    this.clearState();
  }

  clearState() {
    // Reset state back to default - called above when form submitted
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';

    // Call clearState from logService injected.
    this.logService.clearState();
  }

  // Generate random ID
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
