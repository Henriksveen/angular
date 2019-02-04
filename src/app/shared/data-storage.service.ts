import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-d4735.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-recipe-book-d4735.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )).subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
