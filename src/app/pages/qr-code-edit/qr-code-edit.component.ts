import {Component, inject, OnInit} from '@angular/core';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LogoComponent} from "../../components/logo/logo.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LanguagePickerComponent} from "../../components/language-picker/language-picker.component";


interface QrForm {
items : FormArray<FormGroup<QrKeyValueForm>>;
}

interface QrKeyValueForm {
  key: FormControl<string>;
  value: FormControl<string>;
}

@Component({
  selector: 'app-qr-code-edit',
  templateUrl: './qr-code-edit.component.html',
  styleUrls: ['./qr-code-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LogoComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LanguagePickerComponent,
  ],
})
export class QrCodeEditComponent implements OnInit{
  fb = inject(FormBuilder);
  form: FormGroup<QrForm> | undefined;
  items: { key: string, value: string }[] = [];
  loading = false;
  index = 0;
  qrFormGroup: FormGroup | undefined;
  qrFormData: QrForm | undefined;
  ngOnInit() {
    this.createForm();

  }
  createForm() {
    this.qrFormGroup = this.fb.group<QrForm>(<QrForm>{
      items: this.fb.array<FormGroup<QrKeyValueForm>>({
        key: new FormControl<string>('',{
          nonNullable:true,
          validators: [
            Validators.required,
          ]
        }),
        value: new FormControl<string>('',{
          nonNullable:true,
          validators: [
            Validators.required,
          ]
        })
        }
      }), // You can use FormArray to handle dynamic arrays
    });


  }
  addItem() {
    const validItems = this.items.filter(item => item.key.trim() !== "" && item.value.trim() !== "");

    if (validItems.length > 0) {
      this.items.push({key: '', value: ''});
    }
  }

  removeItem(index: number) {

    this.items.splice(index, 1);
  }

  submit(){

  }

}
