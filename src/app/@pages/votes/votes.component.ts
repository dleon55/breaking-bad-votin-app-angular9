import { changeVotes } from './../../@core/operations/subscription';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { Character } from 'src/app/@core/interfaces/character.interface';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {
  characters: Character[] = [];
  loading: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getCharacters(true).subscribe((data) => {
      this.characters = data;
      console.log('personajes characters ',this.characters);
      this.loading = false;
    });
    this.changeVotes();
  }

  // Suscribirse al cambio de votos
  changeVotes() {
    this.apiService.changeVotesListener().subscribe(({data}) => {
      console.log('cambio',data);
      this.characters = data['changeVotes'];
    });
  }

  addVote(character: string) {
    this.apiService.addVote(character).subscribe(({data}) => {
      console.log(data);
    });
  }

}
