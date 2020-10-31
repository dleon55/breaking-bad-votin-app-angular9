import { ApiService } from './../../@core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getCharacters(false).subscribe((data)=>console.log(data));
  }

}
