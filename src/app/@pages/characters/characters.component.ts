import { ApiService } from "./../../@core/services/api.service";
import { Component, OnInit } from "@angular/core";
import { Character } from 'src/app/@core/interfaces/character.interface';

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.scss"],
})
export class CharactersComponent implements OnInit {
  loading: boolean;
  character: Character[] = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.api.getCharacters(false).subscribe((data) => {
      this.character = data;
      this.loading = false;
    });
  }
}
