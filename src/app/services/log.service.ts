import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs: Log[];

  //Source = initial values = behaviursubject with type of log
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null,
  });

  // Selected log observable - used when a log is clicked onto
  selectedLog = this.logSource.asObservable();

  // State source & observable
  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date('01/06/2020 15:51:21'),
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('01/06/2020 09:25:58'),
    //   },
    //   { id: '3', text: 'Fixed bug', date: new Date('01/06/2020 10:11:20') },
    // ];

    this.logs = [];
  }

  // Get logs - observable of arrays with type of log
  getLogs(): Observable<Log[]> {
    // Check if logs saved in local storage
    // If no logs, set to blank array
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
      // Else if there are logs, convert to JSON and set to logs object
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    // Sort logs to newest first
    return of(
      this.logs.sort((a, b) => {
        return b.date - a.date;
      })
    );
  }

  // Set log when clicked
  setFormLog(log: Log) {
    // Pass selected log into log source
    this.logSource.next(log);
  }

  // Add log
  addLog(log: Log) {
    // Add new log (passed in) to start of logs array
    this.logs.unshift(log);

    // Add new log to local storage - set logs object in LS, populate with this.logs - need to convert to string
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  // Update log
  updateLog(log: Log) {
    // Loop through existing logs and find the log based on ID
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        // Remove old version
        this.logs.splice(index, 1);
      }
    });

    // Add updated log to array
    this.logs.unshift(log);

    // Add updated logs array to local storage - set logs object in LS, populate with this.logs - need to convert to string
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  // Delete log
  deleteLog(log: Log) {
    // Loop through existing logs and find the log based on ID
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        // Remove the log from array
        this.logs.splice(index, 1);
      }
    });

    // Remove from local storage - set LS to new array without this log
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  // Clear state
  clearState() {
    // Pass true to other components
    this.stateSource.next(true);
  }
}
