import { BehaviorSubject, catchError, map, of } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { ProductsService } from '../../services/products.service';
import { Product } from './../../containers/products/interfaces/product';
import { TagsService } from '../../services/tags.service';
import { Tag } from '../../containers/products/interfaces/tag';
import { ErrorDialogComponent } from 'src/app/shered/components/error-dialog/error-dialog.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProductComponent implements OnInit {
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private productService: ProductsService,
    private tagService: TagsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  allTags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([
    {
      _id: '1',
      name: 'oferta',
    },
  ]);
  tags = signal<Tag[]>([]);

  readonly currentTag = model('');
  readonly announcer = inject(LiveAnnouncer);
  readonly filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();
    return currentTag
      ? this.allTags$.pipe(
        map(tags => tags.filter((tag) => tag.name.toLowerCase().includes(currentTag))))
      : this.allTags$;
  });

  arrayMinSize(minItems: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const array = control.value;
      if (Array.isArray(array)) {
        if (array.length < minItems) {
          return { 'minItems': { value: minItems } };
        }
      } else {
        return { 'notAnArray': true };
      }
      return null;
    };
  }

  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(255),
      ],
    ],
    urlImage: ['', [Validators.required]],
    unitValue: [0, [Validators.required, Validators.min(1)]],
    tags: [this.formBuilder.array([]), [Validators.required, /*this.arrayMinSize(1)*/]],
    currentTag: ['', [Validators.required]],
  });

  async ngOnInit(): Promise<void> {
    const product: Product = this.route.snapshot.data['product'];
    // if (!product) return;

    this.getTags();

    this.form.setValue({
      _id: '0',
      name: product.name,
      description: product.description,
      urlImage: product.urlImage,
      unitValue: product.unitValue,
      tags: [],
      currentTag: '',
    });
  }

  getErrorMassage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `O campo deve ter no minimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `O campo deve ter no maximo ${requiredLength} caracteres`;
    }

    if (field?.hasError('min')) {
      return 'O valor unitário deve ser maior que zero';
    }

    if (field?.hasError('minItems')) {
      const requiredLength: number = field.errors
        ? field.errors['minItems']['value']
        : 1;
      return `Selecione pelo menos ${requiredLength} tag(s)`;
    }

    return 'Campo inválido';
  }

  private onError(err: any) {
    this._snackBar.open(`${err.message}`, '', {
      duration: 5000,
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.productService
      .save({
        ...this.form.value,
        tags: this.form.value.tags?.map((tag: unknown) => tag as Tag),
      })
      .subscribe({
        next: (data: Product) => console.log(data),
        error: (err: any) => this.onError(err),
      });
  }

  onClear() {
    this.form.reset();
  }

  openDialogError(error: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
    });
  }

  getTags() {
    this.tagService
      .list()
      .pipe(
        catchError((error) => {
          console.log(error);
          this.openDialogError(error.statusText);
          return of([]);
        })
      )
      .subscribe((tags) => {
        this.allTags$.next(tags);
      });
  }

  remove(tag: Tag): void {
    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) return tags;
      tags.splice(index, 1);
      this.announcer.announce(`Tag ${tag} removida`);
      return [...tags];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const { _id, name } = event.option.value;
    if (this.addedTag(event.option.value)) return;

    const newTag: Tag = { _id, name };
    this.tags.update((currentTags) => [...currentTags, newTag]);
    this.currentTag.set('');
    event.option.deselect();

    this.announcer.announce(`Tag ${name} adicionada`);
  }

  addedTag(tag: Tag): boolean {
    return this.tags().find((t) => t._id == tag._id) ? true : false;
  }
}
