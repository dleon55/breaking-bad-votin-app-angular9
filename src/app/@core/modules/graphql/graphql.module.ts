import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpClient: HttpClient) {
    //Configurar url principal con el link
    const httpLink = new HttpLink(httpClient).create({
      uri: "https://dleon-votaciones-graphql.herokuapp.com/graphql",
    });

    //Configurar ws con el link
    const subscriptionLink = new WebSocketLink({
      uri: "wss://dleon-votaciones-graphql.herokuapp.com/graphql",
      options: {
        reconnect: true,
      },
    });
    //Unir dos conexiones
    const link = split(
      ({ query }) => {
        const { kind, operation }:any = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      subscriptionLink,
      httpLink
    );

    //Crear conexión
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
