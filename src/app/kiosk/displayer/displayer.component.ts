import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetailsService } from './DetailsService';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css']
})
export class DisplayerComponent implements OnInit {
  summary: string;
  start_time: String;
  end_time: String;
  start_date: String;
  selectedRoom: Location;
  title: string;
  // roomSelected: any[];
  // selectedtime: any;

  public now: Date = new Date();
  public TodayTime = this.now.getTime();
  public startdates = []
  public MeetingEndTime: Date;

  @Input() Room;
  public Details;
  public RoomDetails;
  public runtime=100;


  constructor(private _myService: DetailsService) {
    // this.SelectedLocations();
  }


  onSubmit() {
    setInterval(() => {
      this.now = new Date();
    }, 1);
    // console.log(this.bookingModel);
    this.selectedRoom = location;
    console.log(this.now);
    // this.Displayer(this.Details);

  }

  ngOnInit() {
    this.getuniqueLocations();


  }

  getUniqueValues(details) {
    const locations = []
    for (var i in details) {
      locations.push(details[i].location);
      for (var j in locations) {
        locations.sort();
      }
    }
    return new Set(locations)
  }

  //method called OnInit
  getuniqueLocations() {
    this._myService.getDetails().subscribe(
      //read data and assign to public variable students
      data => { this.Details = this.getUniqueValues(data) },
      err => console.error(err),
      () => console.log('finished loading')
    );

  }

  SelectedLocations() {
    this._myService.SelectedInfo(this.selectedRoom).subscribe(
      //read data and assign to public variable students
      data => {

        this.RoomDetails = this.getRecentData(data);
        console.log(this.runtime);


      },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }

  getRecentData(details) {
    const recentData = [];
this.startdates=[];
    for (var i in details) {
      var Today = new Date();
      var TodayTime = Today.getTime();
      var x = details[i].startdate;
      var y = details[i].enddate;
      var Meetingstart = new Date(x).getTime();
      var Meetingend = new Date(y).getTime();

      if (TodayTime < Meetingend) {
        recentData.push(details[i]);
        recentData.sort((a, b) => (a.startdate > b.startdate) ? 1 : -1);
      }
    }

    for(var i in recentData)  
    { 
      var Today = new Date();
      var TodayTime = Today.getTime();
      var x = recentData[i].startdate;
      var y = recentData[i].enddate;
      var Meetingstart = new Date(x).getTime();
      var Meetingend = new Date(y).getTime();
if (TodayTime==Meetingstart || (TodayTime<Meetingend&&Meetingstart<TodayTime)){
    this.runtime = Meetingend - Meetingstart-(TodayTime-Meetingstart);
    this.startdates.push(this.runtime);
    this.title=recentData[i].summary;  
}
    }
    return new Set(recentData);
  }


  onSelect(Room): void {
    this.selectedRoom = Room;
    this.SelectedLocations();
    // this.upcomingMeetings();
    //this.Displayer(this.Details);

  }

  getTimeStamp(s) {
    return new Date(s).getTime();
  }
  //method called OnInit
  getDetails() {
    this._myService.getDetails().subscribe(
      data => {
        console.log(data);
        this.Details = data;
      },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }

}


  //   interval;

  // startTimer() {
  //     this.interval = setInterval(() => {
  //       if(this.runtime > 0) {
  //         this.runtime--;
  //       } else {
  //         this.runtime = 10000;
  //       }
  //     },1000)
  //   }

  // Displayer(details) {

  //   //     // setTimeout(() => {
  //   //     //   window.location.reload();
  //   //     // }, 30000);
  //   console.log('Now ka value ' + this.now);
  //   console.log('details ka value ' + details);
  //   for (var i in details) {
  //     console.log('details ka value --- ' + details);
  //     if (this.now === details[i].starttime) {
  //       this.runtime = details[i].endtime - this.now.getTime();
  //       this.title = details[i].summary;



  //       console.log(this.title);
  //       return this.runtime;
  //     }

  //   }

  // }

      // console.log('now ka value:' + this.TodayTime);
      // console.log('starttime ka value' + Meetingstart);

      // if (this.now.getTime() == Meetingstart) {
      //   console.log('inside if');
      //   this.runtime = Meetingend - this.now.getTime();
      //   this.title = details[i].summary;
      //   console.log('runtime ka value ' + this.runtime);
      // }


        //   var filteredData = [];

        //   for (let i = 0; i <length; i++) {
        //   const sdate= new Date(data[i].startdate);
        //   const edate= new Date(data[i].enddate)
        //   var MeetingstartTime = sdate.getTime();
        //   var MeetingendTime = edate.getTime();
        //   var Today = new Date();
        //   var TodayTime= Today.getTime();

        //   //Testing - Replace MeetingEndTime with TestTime in the if condition and change the value of td2 to the test value 
        //   if (TodayTime < MeetingstartTime )
        //   {

        //     filteredData.push(data[i]);
        //     console.log("Meeting End Time"+" "+MeetingstartTime);
        //     console.log( "Today Time"+" "+TodayTime);
        //   }   
        // }

//   listchecker(){
//     this.TodayTime= this.now.getTime();
//     this.selectedtime=this.getTimeStamp(this.Room.startdate);
//  if(this.TodayTime<this. selectedtime)
//     {
//       this.checker=true;
//     }
//   else
//   {
//     this.checker=false;
//   }    
//   console.log(this.checker);
//   }
  // transform(values: number[]|string[]|object[], key?: string, reverse?: boolean) {
  //   if (!Array.isArray(values) || values.length <= 0) {
  //     return null;
  //   }

  //   return this.sort(values, key, reverse);
  // }

  // private sort(value: any[], key?: any, reverse?: boolean): any[] {
  //   const isInside = key && key.indexOf('.') !== -1;

  //   if (isInside) {
  //     key = key.split('.');
  //   }

  //   const array: any[] = value.sort((a: any, b: any): number => {
  //     if (!key) {
  //       return a > b ? 1 : -1;
  //     }

  //     if (!isInside) {
  //       return a[key] > b[key] ? 1 : -1;
  //     }

  //     return this.getValue(a, key) > this.getValue(b, key) ? 1 : -1;
  //   });

  //   if (reverse) {
  //     return array.reverse();
  //   }

  //   return array;
  // }

  // private getValue(object: any, key: string[]) {
  //   for (let i = 0, n = key.length; i < n; ++i) {
  //     const k = key[i];
  //     if (!(k in object)) {
  //       return;
  //     }

  //     object = object[k];
  //   }

  //   return object;
  // }



