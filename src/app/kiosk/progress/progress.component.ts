import { Component, OnInit, Input } from '@angular/core';
import { DetailsService } from 'src/app/kiosk/displayer/DetailsService';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  location: string;
  summary: string;
  start_time: String;
  end_time: String;
  startdate: Date;
  enddate: Date;
  selectedRoom: Location;
  roomSelected: any;
  public RoomDetails;
  public Details;
  public runtime = 10000;
  //initialize the call using StudentService 
  constructor(private _myService: DetailsService) { }
  ngOnInit() {
    this.getDetails();
  }
  // subtitleFormat callback example
  onSubmit() {
    this.selectedRoom = location;
    // this.getruntime();
  }

  getRuntimeValues(details) {
    const runtimes = []
    for (var i in details) {
      var x = details[i].startdate;
      var starter = new Date(x);
      var y = details[i].enddate;
      if (x > starter) {
       var Rtime = y - x;
        runtimes.push(Rtime);
      }

  runtimes.sort((a, b) => (a.startdate > b.startdate) ? 1 : -1)




    }
    return new Set(runtimes)
  }


  //method called OnInit
  getDetails() {

    this._myService.getDetails().subscribe(
      //read data and assign to public variable students
      data => {
        this.Details =this.getRuntimeValues(data);
      },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }


  getTimeStamp(s) {
    return new Date(s).getTime();
  }

}

//   public Runtimes;
//   getruntime() {

// for (let i =0; i<this.Details;i++)
// {
// const sdate= new Date(this.Details[i].startdate);
// const edate= new Date(this.Details[i].enddate)
// var MeetingstartTime = sdate.getTime();
// var MeetingendTime = edate.getTime();
// var Today = new Date();
// var TodayTime= Today.getTime();

// //Testing - Replace MeetingEndTime with TestTime in the if condition and change the value of td2 to the test value 
// if (TodayTime === MeetingstartTime)
// { 

//   this.runtime=MeetingendTime-MeetingstartTime;
//   this.Runtimes.push(this.runtime);
//   console.log("Meeting End Time"+" "+MeetingstartTime);
//   console.log( "Today Time"+" "+TodayTime);
//   console.log("runtime"+this.runtime);
// }
// else{
//   this.runtime=0;
// }
// }
//     // var Today = new Date();
//     // var TodayTime = Today.getTime();
//     // if (TodayTime == this.getTimeStamp(this.startdate)) {
//     //   this.runtime = this.getTimeStamp(this.enddate) - this.getTimeStamp(this.startdate);
//     //   return this.runtime;
//     // }
//     // return 0;

//   }