import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sc-field-errors',
  template: `
    <small class="help-block" ngxErrors="field">
      <span ngxError="min" when="['dirty', 'touched']">{{descField}} debe ser superior a {{ getMinValue() }}</span>
      <span ngxError="max" when="['dirty', 'touched']">{{descField}} debe ser inferior a {{ getMaxValue() }}</span>
      
    	<span ngxError="required" when="touched">Este campo es requerido.</span>
    	<span ngxError="pattern" when="['dirty', 'touched']">El correo no es valido.</span>
    	<span ngxError="minlength" when="['dirty', 'touched']">Mínimo {{ getMinLength() }} caracteres.</span>
    	<span ngxError="maxlength" when="['dirty', 'touched']">Máximo {{ getMaxLength() }} caracteres.</span>
    </small>`,
  styles: []
})
export class FieldErrorsComponent {
  @Input() public form!: FormGroup;
  @Input() public field!: string;
  @Input() public fields!: any[];
  


  @Input() public minLength!: number;
  @Input() public maxLength!: number;

  descField="";
  

  getMaxValue():string{

    var retValue:any;

    const Control = this.form.controls;

    var control= Control[this.field];

    if(this.fields!=null && this.fields.length>0)
      this.descField= this.fields.find(item => item.field === this.field).descField;

    retValue=control.getError('max');
    if(retValue!=null)
        retValue= Number(retValue.max).toLocaleString('es-CO'); 

    return retValue;

  }


  
  getMinValue():string{

    var retValue:any;

    const Control = this.form.controls;

    var control= Control[this.field];

    retValue=control.getError('min');
    if(retValue!=null)
        retValue= Number(retValue.min).toLocaleString('es-CO'); 

    return retValue;

  }


  getMinLength(){
    var retValue:any;

    const Control = this.form.controls;

    var control= Control[this.field];

    retValue=control.getError('minlength');
    if(retValue!=null)
        retValue= Number(retValue.minlength).toLocaleString('es-CO'); 

    return retValue;


  }

  
  getMaxLength(){
    var retValue:any;

    const Control = this.form.controls;

    var control= Control[this.field];

    retValue=control.getError('maxlength');
    if(retValue!=null)
        retValue= Number(retValue.maxlength).toLocaleString('es-CO'); 

    return retValue;


  }
 
}
