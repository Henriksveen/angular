import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>('https://ng-recipe-book-d4735.firebaseio.com/recipes.json');
    }),
    map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        console.log(recipes);
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    )
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      return this.http.put('https://ng-recipe-book-d4735.firebaseio.com/recipes.json', state.recipes);
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }
}
