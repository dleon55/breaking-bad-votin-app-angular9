import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { listaPersonajes } from "../operations/query";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private apollo: Apollo) {}
  //lista de personajes
  getCharacters(skip: boolean = true) {
    return this.apollo
      .watchQuery({
        query: listaPersonajes,
        variables: {
          skip,
        },
        fetchPolicy: "network-only",
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data);
          result.data.characters;
        })
      );
  }
}
