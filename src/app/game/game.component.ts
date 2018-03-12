import { Component, OnInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeedsService } from '../feeds.service';
const io = require('socket.io-client');

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
@Injectable()
export class GameComponent implements OnInit {

@ViewChild('inputFile') inputFile: ElementRef;

upload(){
  this.inputFile.nativeElement.click();
}
sendToServer(){
  console.log("It works!");
  let formData = new FormData();
  for(let i=0; i<1; i++){
    formData.append('uploads[]', this.inputFile.nativeElement.files.item[i], )
  }
  console.log(formData);
}



  muted = false;
  title = 'Guess Where I am';
  default = "assets/images/cover.jpg";
  watcher = "assets/images/vader.jpg";
  cheers = new Audio("assets/sounds/cheers.mp3");
  no = new Audio("assets/sounds/no.mp3");
  evil = new Audio("assets/sounds/evil.mp3");
  explode = new Audio("assets/sounds/explode.mp3");
  background = new Audio("assets/sounds/bensound-epic.mp3");
  background2 = new Audio("assets/sounds/bensound-instinct.mp3");
  background3 = new Audio("assets/sounds/bensound-ofeliasdream.mp3");
  current_background = this.background;
  src: string;
  tries: number;
  lives: number;
  therandom: any;
  message: string;
  won: boolean;
  hint: string;
  io: any;
  socket:any;
  full = [
    [
      { "name": "1", "src": this.default, "hint" : "Unity"},
      { "name": "2", "src": this.default, "hint" : "Yesterday, _day, and forever!"},
      { "name": "3", "src": this.default, "hint" : "On the tree and you'll see the answer!"},
      { "name": "4", "src": this.default, "hint": "_ years don waka" }
    ],
    [
      { "name": "5", "src": this.default, "hint": "Waka!" },
      { "name": "6", "src": this.default, "hint": "Kanu Atlanta" },
      { "name": "7", "src": this.default, "hint": "Week" },
      { "name": "8", "src": this.default, "hint": "Check out that figure!" }
    ],
    [
      { "name": "9", "src": this.default, "hint": "_/11" },
      { "name": "10", "src": this.default, "hint": "Ben _"},
      { "name": "11", "src": this.default, "hint": "_ and a goalkeeper" },
      { "name": "12", "src": this.default, "hint": "Apostles" }
    ],
  ]

  constructor(public router: Router, public feeds: FeedsService) {
    this.router = router;
    this.feeds = feeds;
  }

  congrats(x, y) {
    if (x.name == y) {
      this.current_background.pause();
      this.current_background = this.background
      this.current_background.play();
      this.won = true;
      this.message = "Luck is on your side!";
      this.explode.play();
      this.watcher = "assets/images/thor.jpg";
      this.cheers.play();
      return true;
    }
    else {
      --this.lives;
      return false;
    }
  }

  mute(){
    this.muted = true;
    this.current_background.pause();
  }

  unmute(){
    this.muted = false;
    this.current_background.play();
  }

  evilLaugh() {
    if (this.won == true) {
      this.explode.play();
      return
    }
    this.evil.play();
  }

  reload() {
    this.current_background.pause();
    this.router.navigateByUrl("reload");
  }

  changeImage(y) {
    /*
    when an image is double-clicked, a weird behaviour occurs. This is as a result
    of the delay by the setTimeout function. The following "if" statement checks to see if the 
    function has finished running.
    */
    if (y.done == false || this.tries > 5 || this.won == true) {
      return
    }



    else {
      y.done = false
      y.original = y.src;
      y.src = "assets/images/wrong.jpg";
      if (this.congrats(y, this.therandom) == false) {
        this.no.play();
        setTimeout(function () {
          y.src = y.original
          y.done = true
        }, 500);
        ++this.tries;
        let index = Math.ceil(((this.therandom) / 4) - 1)
          if (this.therandom % 4 != 0) {
            var r = this.therandom % 4 - 1;
          }
          else {
            var r = 3;
          }
          this.hint = this.full[index][r].hint;
        if (this.tries > 5) {
          let x = Math.ceil(((this.therandom) / 4) - 1)
          if (this.therandom % 4 != 0) {
            var r = this.therandom % 4 - 1;
          }
          else {
            var r = 3;
          }
          this.full[x][r].src = "assets/images/tied.jpg";
          this.message = "GAME OVER!!!"
          this.current_background.pause();
          this.evil.play();
          this.current_background = this.background3;
          this.current_background.play();
          //we reveal the correct answer afterwards

        }
        return
      }
      y.src = "assets/images/freedom.gif";
      ++this.tries;

    }
    //console.log("action");
  }
  ngOnInit() {
    // this.feeds.getFeeds().subscribe(data=>{
    //   if(data){
    //     this.full = data; 
    //   }
    // });
    var socket = io('http://localhost:3000');
    socket.on('new msg', function(msg){
      window.alert(msg);
    })
    this.current_background = this.background2
    this.current_background.play();
    this.tries = 0;
    this.lives = 6;
    this.message = "";
    this.therandom = Math.floor(Math.random() * 12) + 1;
    this.won = false;
  }
}
