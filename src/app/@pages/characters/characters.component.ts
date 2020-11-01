import { Character } from "./../../@core/components/interfaces/character.interface";
import { ApiService } from "./../../@core/services/api.service";
import { Component, OnInit } from "@angular/core";

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
