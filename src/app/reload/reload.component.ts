import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css']
})
export class ReloadComponent implements OnInit {

  constructor(public router: Router) {
    this.router = router;
   }

  ngOnInit() {
    this.router.navigateByUrl("/game");
  }

}
